const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/hello', usersController.test);




module.exports = router;