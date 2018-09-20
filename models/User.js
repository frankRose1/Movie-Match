const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

/**
 * TODO: delete this
 *  Schema comments
 *  Cafe will have ref to a user
 *      Cafe will also have array of reviews || Review will have reference to a Cafe
 *  Review will need ref to the user who authored it
 */

const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Please provide your email!',
        validate: [validator.isEmail, "Invalid email address."],
        unique: true,
        lowercase: true,
        trim: true
    },
    first_name: {
        type: String,
        required: 'First name is required.',
        trim: true
    },
    last_name: {
        type: String,
        required: 'Last name is required.',
        trim: true
    },
    password: {
        type: String,
        required: 'Password is required.'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;