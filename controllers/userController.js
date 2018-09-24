const mongoose = require('mongoose');
const User = mongoose.model('User');

const userController = {};

// POST /users
userController.createUser = (req, res) => {
    res.json({msg: 'validated'})
};

userController.userLogin = async (req, res) => {

};

module.exports = userController;