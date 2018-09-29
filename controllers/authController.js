/**
 * Handles all authorization and authentication
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');
const authController = {};

authController.userLogin = (req, res, next) => {
  const {email, password} = req.body;
  if (email && password) {
    //authenticate the user
    User.authenticate(email, password, (err, user) => {
      if (err) return next(err);
      //add the user id to the session
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

//log the user out by destroying the session
authController.userLogout = (req, res, next) => {
  if (req.session) {
    req.session.destroy( err => {
      if (err) return next(err);
      res.location("/").sendStatus(200);
    });
  }
};

authController.requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    const error = new Error('You must be logged in to view this page!');
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