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

// GET /users/account --> use to populate an "update user account" form
userController.userAccount = async (req, res) => {
  const user = await User.findById(req.session.userId, 'name email');
  res.json(user);
};

// PUT /users/account 204
userController.updateUserAccount = async (req, res) => {
  // not updating password at this route
  const updates = {
    name: req.body.name,
    email: req.body.email
  };
  const user = await User.findOneAndUpdate(
    { _id: req.session.userId}, 
    { $set: updates },
    //return the new user and runValidation again
    { new: true, runValidators: true, context: 'query' }
  );
  res.location('/users/account');
  res.sendStatus(204);
};



module.exports = userController;