const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const md5 = require('md5');
const passportLocalMongoose = require('passport-local-mongoose'); //takes acre of adding additional fields/methods needed for logging a user in
const uniqueValidator = require('mongoose-unique-validator')
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Please provide your email!',
        validate: [validator.isEmail, "Invalid email address."],
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: 'Please provide your name.',
        trim: true
    }
});

//give our schema the fields necessary for logging in/authentication and use email address as the login field
    //will add a username, hash and salt field to store the username, the hashed password and the salt value
UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
UserSchema.plugin(uniqueValidator); //turns the unique error in to a validation error which will be caught by the error handler

const User = mongoose.model('User', UserSchema);

module.exports = User;