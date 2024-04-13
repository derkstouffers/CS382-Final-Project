var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {String, required: true },
    lastName: {String, required: true },
    userName: {String, required: true },
    email: {String, required: true },
    password: {String, required: true },
    settings: { type: Schema.Types.ObjectId, ref: 'settings'}
});

// Provides all objects from user database
userSchema.statics.listAllUsers = function() {
    return this.find({});
};

const user = mongoose.model('user', userSchema);

module.exports = user;


