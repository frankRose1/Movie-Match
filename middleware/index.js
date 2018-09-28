const multer = require('multer'); //upload an image
const jimp = require('jimp'); //resize the image
const uuidv4 = require('uuid/v4'); //creates unique names for each uploaded image
const {validationResult, body, check } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const middleware = {};

//tell multer where to store the photos
//store the original in memory temporarily, then resize it and store the resized version to disk
//if someone uploads a large file we dont want to store that in memoery, only the resized version
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next){
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      //send an error message
      next({message: 'That file type isn\'t allowed!'}, false);
    }
  }
};

//looking for a single field called "photo"
middleware.uploadPhoto = multer(multerOptions).single('photo');

middleware.resizePhoto = async function(req, res, next){
  //multer will populate req.file with the uploaded image if there is one
  if (!req.file) {
    return next();
  }
  //get the filetype and put the photo on the req.body
  const fileExtension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuidv4()}.${fileExtension}`;
  //resize the image
    //you can either pass jimp a path to the file on the server or a buffer
    //currently the file is in memory as a buffer for a few seconds
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  //now write it
  await photo.write(`./uploads/${req.body.photo}`);
  next();
};

middleware.createRegisterValidation = [
  sanitizeBody('name'),
  check('name').not().isEmpty().withMessage('Please provide your name!'),
  check('email').isEmail().withMessage('That email is invalid'),
  sanitizeBody('email').normalizeEmail({
    remove_dots: false, //"john.doe" will not become "johndoe"
    gmail_remove_subaddress: false
  }),
  check('password').not().isEmpty().withMessage("Password can not be blank!"),
  check('confirmPassword').not().isEmpty().withMessage("Confirmed password can not be blank!")
];

//Perform additional checks before the registration happens
middleware.validateRegister = (req, res, next) => {
  if (req.body.password === req.body.confirmPassword) {
    //perform the checks
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({errors: errors.array().map(err => err.msg)});
  } else {
    const pwError = new Error("Oops! Your passwords don't match!");
    pwError.status = 400;
    next(pwError);
  }
};

module.exports = middleware;