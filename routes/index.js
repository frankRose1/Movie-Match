const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cafeController = require('../controllers/cafeController');
const {catchErrors} = require('../handlers/errorHandlers');


//cafe routes
router.post('/cafes', catchErrors(cafeController.createCafe));

// user routes
router.post('/users', userController.createUser);

//review routes


module.exports = router;