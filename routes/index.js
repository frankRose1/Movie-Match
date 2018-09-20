const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cafeController = require('../controllers/cafeController');
const {catchErrors} = require('../handlers/errorHandlers');


//cafe routes
router.get('/', catchErrors(cafeController.getCafes));
router.get('/cafes', catchErrors(cafeController.getCafes));
router.get('/cafe/:cafeId', catchErrors(cafeController.getIndividualCafe));
router.post('/cafes', catchErrors(cafeController.createCafe));
router.put('/cafes/:cafeId/edit', catchErrors(cafeController.updateCafe));


// user routes
router.post('/users', userController.createUser);

//review routes


module.exports = router;