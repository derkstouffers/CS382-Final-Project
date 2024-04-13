var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    settings: { type: Schema.Types.ObjectId, ref: 'settings'}
});

// Provides all objects from user database
userSchema.statics.listAllUsers = function() {
    return this.find({});
};

const user = mongoose.model('user', userSchema);

module.exports = user;


