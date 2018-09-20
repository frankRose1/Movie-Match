const mongoose = require('mongoose');
const User = mongoose.model('User');

const userController = {};

// TODO: Hash the password before saving
// POST /users
userController.createUser = (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    if (password === confirmPassword) {

        const userData = {
            firstName,
            lastName,
            email,
            password
        };
    }
    //handle when passwords dont match
};

module.exports = userController;