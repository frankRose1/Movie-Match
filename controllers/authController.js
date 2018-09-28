/**
 * Handles all authorization and authentication
 */
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

module.exports = authController;