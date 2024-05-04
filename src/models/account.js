var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new mongoose.Schema({
    userID: String, // Links a settings document to an associated user
    accountID: String,
    accountName: String,
    subtype: String,
    current_balance_available: Number
});

let account = mongoose.model('account', accountSchema);

module.exports = account;


