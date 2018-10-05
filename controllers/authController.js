/**
 * Handles all authorization and authentication
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {randomBytes} = require('crypto');
const { promisify } = require('util');
const authController = {};

//POST /users/login
authController.userLogin = (req, res, next) => {
  const {email, password} = req.body;
  if (email && password) {
    //authenticate the user
    User.authenticate(email, password, (err, user) => {
      if (err) return next(err);
      if (!user) {
        const error = new Error('The password you provided is incorrect.');
        error.status = 400;
        return next(error);
      }
      //log the user in
      req.session.userId = user._id;
      res.location("/");
      res.sendStatus(200);
    });
  } else {
    const error = new Error('Email and password are required!');
    error.status = 400;
    next(error);
  }
};

// GET /users/logout
authController.userLogout = (req, res, next) => {
  //log the user out by destroying the session
  if (req.session) {
    req.session.destroy( err => {
      if (err) return next(err);
      res.location("/").sendStatus(200);
    });
  }
};

//POST /users/reset
authController.forgotPassword = async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    const error = new Error('An account with that email address doesn\'t exist!');
    error.status = 400;
    throw error;
  }
  //set token and expiry on user account
  const randomBytesPromisified = promisify(randomBytes);
  user.resetPasswordToken = ( await randomBytesPromisified(20) ).toString('hex');
  user.resetPasswordExpiry = Date.now() + 3600000; //1 hour from now
  await user.save();
  // TODO: email the token to the user
  const resetUrl = `http://${req.headers.host}/users/account/reset/${user.resetPasswordToken}`;
  res.json({link: resetUrl});
  //res.json({message: 'Your password reset link was sent to your email address.'});
};

// PUT /users/account/reset/:resetToken
authController.resetPassword = async (req, res) => {
  const {password, confirmPassword} = req.body;
  let error;
  if (password !== confirmPassword) {
    error = new Error('Your passwords don\'t match!');
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({
    resetPasswordToken: req.params.resetToken,
    resetPasswordExpiry: { $gt: Date.now() }
  });
  if (!user) {
    error = new Error('Password reset token is invalid or has expired.');
    error.status = 400;
    throw error;
  }
  //update the user, bcrypt will hash the password(tied to a pre-save hook)
  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpiry = null;
  await user.save();
  //sign the user in
  req.session.userId = user._id;
  res.location('/').sendStatus(200);
};

authController.requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    const error = new Error('Oops! You need to be logged in to do that!');
    error.status = 400;
    return next(error);
  }
};

//to protect routes such as login and register
authController.requiresLogout = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  } else {
    next();
  }
};

module.exports = authController;