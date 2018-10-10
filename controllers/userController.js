const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const userController = {};

// POST /users/register
userController.createUser = async (req, res) => {
  const user = await new User(req.body);
  await user.save();
  //log the user in by creating a JWT
  const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });
  res.location('/');
  res.sendStatus(201);
};

// GET /users/account --> use to populate an "update user account" form
userController.userAccount = async (req, res) => {
  const user = await User.findById(req.userId, 'name email');
  res.json(user);
};

// PUT /users/account 204
userController.updateUserAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };
  const user = await User.findOneAndUpdate(
    { _id: req.userId}, 
    { $set: updates },
    //return the new user and runValidation again
    { new: true, runValidators: true, context: 'query' }
  );
  res.location('/users/account');
  res.sendStatus(204);
};


module.exports = userController;