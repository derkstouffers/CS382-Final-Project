var mongoose = require("mongoose");
var crypto = require("crypto");
const { type } = require("os");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },

    userName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    hash : String,
    salt : String, //adds random data to password
    settings: { type: Schema.Types.ObjectId, ref: 'settings'}
});

userSchema.methods.setPass = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    //Hash user's salt and password with 1000 iterations,
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

//method to check if password entered was correct
userSchema.methods.validPass = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

// Provides all objects from user database
userSchema.statics.listAllUsers = function() {
    return this.find({});
};

const user = mongoose.model('user', userSchema);

module.exports = user;


