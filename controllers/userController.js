const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const User = mongoose.model('User');

const userController = {};

// POST /users/register
userController.createUser = async (req, res) => {
  const {name, email, password} = req.body;
  const avatar = gravatar.url(email, {
    r: "pg", //Rating,
    s: "200", //Size
    d: "mm" //Default photo
  });
  const userData = {
    name,
    email,
    password,
    avatar
  }
  const user = await new User(userData);
  await user.save();
  //log the user in by creating a JWT
  const payload = { id: user.id, name: user.name, avatar: user.avatar };
  const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: 3600 } );
  res.json({token: token});
};

// GET /users/account --> use to populate an "update user account" form
userController.userAccount = (req, res) => {
  const { name, id, email, avatar } = req.user
  res.json({name, id, email, avatar});
};

// PUT /users/account 204
userController.updateUserAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };
  const user = await User.findOneAndUpdate(
    { _id: req.user.id}, 
    { $set: updates },
    //return the new user and runValidation again
    { new: true, runValidators: true, context: 'query' }
  );
  res.location('/users/account');
  res.sendStatus(204);
};


module.exports = userController;