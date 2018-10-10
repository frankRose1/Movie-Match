/**
 * Handles all authorization and authentication
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const mail = require('../handlers/mail');
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
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
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
  res.clearCookie('token');
  res.location('/').sendStatus(200);
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
  const resetUrl = `http://${req.headers.host}/users/account/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    subject: 'Password Reset',
    resetUrl,
    filename: 'password-reset'
  });
  res.json({message: `If ${req.body.email} is the email address for your account, you will receive an email with instructions for resetting your password.`});
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
  const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  res.location('/').sendStatus(200);
};

authController.requiresLogin = (req, res, next) => {
  if (req.userId) {
    return next();
  } else {
    const error = new Error('Oops! You need to be logged in to do that!');
    error.status = 400;
    return next(error);
  }
};

//to protect routes such as login and register
authController.requiresLogout = (req, res, next) => {
  if (req.userId) {
    const error = new Error('You need to be logged out to do that!');
    error.status = 400;
    return next(error);
  } else {
    next();
  }
};

module.exports = authController;