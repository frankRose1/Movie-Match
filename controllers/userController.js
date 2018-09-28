const mongoose = require('mongoose');
const {promisify} = require('es6-promisify');
const User = mongoose.model('User');

const userController = {};

// POST /users
userController.createUser = async (req, res) => {
  const user = new User({name: req.body.name, email: req.body.email});
  //pomisify the register method(provided by passport-local-mongoose) and bind it to the User object
  const register = promisify(User.register, User);
  await register(user, req.body.password); //passport-local-mongoose put a salt and hash on the user doc
  next(); //move along to autController.login
};

userController.userLogin = async (req, res) => {
  
};

module.exports = userController;