const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cafeController = require('../controllers/cafeController');
const authController = require('../controllers/authController');
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
  authController.requiresLogin,
  middleware.uploadPhoto,
  catchErrors(middleware.resizePhoto),
  catchErrors(cafeController.createCafe)
);
//TODO: make sure the owner of the store is the one trying to update it
router.put('/cafes/:cafeId/edit',
  middleware.uploadPhoto,
  catchErrors(middleware.resizePhoto),
  catchErrors(cafeController.updateCafe)
);
router.get('/cafes/tags', catchErrors(cafeController.getCafesByTag));
router.get('/cafes/tags/:tag', catchErrors(cafeController.getCafesByTag));


// user routes
router.post('/users/register',
  authController.requiresLogout,
  middleware.createRegisterValidation,
  middleware.validateRegister,
  catchErrors(userController.createUser)
);
router.post('/users/login', 
  authController.requiresLogout, 
  authController.userLogin
);
router.get('/users/logout', 
  authController.requiresLogin, 
  authController.userLogout
);

//review routes


module.exports = router;