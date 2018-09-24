const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cafeController = require('../controllers/cafeController');
const {catchErrors} = require('../handlers/errorHandlers');
const middleware = require('../middleware');

/**
 * Uploading & resizing images
 * will need to be implemented as middleware between creating and editing a store
 * multer for uploads (form/request will need to be ==> enctype="multipart/form-data")
 * jimp for resizing
 */

//cafe routes
router.get('/', catchErrors(cafeController.getCafes));
router.get('/cafes', catchErrors(cafeController.getCafes));
router.get('/cafe/:cafeSlug', catchErrors(cafeController.getIndividualCafe));
router.post('/cafes',
  middleware.uploadPhoto,
  catchErrors(middleware.resizePhoto),
  catchErrors(cafeController.createCafe)
);
router.put('/cafes/:cafeId/edit',
  middleware.uploadPhoto,
  catchErrors(middleware.resizePhoto),
  catchErrors(cafeController.updateCafe)
);


// user routes
  // 1) Validate the registration data
  // 2) register the user
  // 3) log the user in
router.post('/users/register',
  middleware.createValidationFor,
  middleware.validateRegister,
  catchErrors(userController.createUser)
);
router.post('/users/signin', userController.userLogin);

//review routes


module.exports = router;