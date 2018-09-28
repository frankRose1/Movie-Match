const mongoose = require('mongoose');
const {promisify} = require('es6-promisify');
const User = mongoose.model('User');

const userController = {};

// POST /users/register
userController.createUser = async (req, res) => {
  const user = await new User(req.body);
  await user.save();
  //log the user in
  req.session.userId = user._id;
  res.location('/');
  res.sendStatus(201);
};

module.exports = userController;