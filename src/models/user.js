var mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String
});

// Provides all objects from videoGame database
userSchema.statics.listAllVideoGames = function() {
    return this.find({});
};

let user = mongoose.model('user', userSchema);

module.exports = user;


