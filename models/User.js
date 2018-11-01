const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

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
    },
    avatar: String,
    password: {
        type: String,
        required: 'You must supply a password!'
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date
});


UserSchema.plugin(uniqueValidator); //turns the unique error in to a validation error which will be caught by the error handler

UserSchema.pre('save', async function(next){
    //if the password was not modified, no need to run this hook
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

/**
 * Authenticae a user when they login
 * @param {string} email - users email to be looked up
 * @param {string} password - hashed password
 * @param {function} callback - either an error or the user document
 */
UserSchema.statics.authenticate = function(email, password, callback){
    
    this.findOne({email: email})
        .exec((err, user) => {
            if (err) return callback(err);
            if (!user) {
                const error = new Error('Couldn\'t find a user with that email address.');
                error.status = 404;
                return callback(error);
            }
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    return callback(null, user);
                }  else {
                    callback(err, null);
                }
            });
        });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;