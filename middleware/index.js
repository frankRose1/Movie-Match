const {validationResult, check } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const middleware = {};

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