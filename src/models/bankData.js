var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transaction = require("./transaction.js");
const account = require("./account.js");

const bankDataSchema = new mongoose.Schema({
    userID: String, // Links a transaction document to the user currently logged in
    accounts: [{ type: Schema.Types.ObjectId, ref: 'account' }], // Array of all accounts associated with the user 
    transactions: [{ type: Schema.Types.ObjectId, ref: 'transaction' }] // Array of all transactions associated with the user 
});

let bankData = mongoose.model('bankData', bankDataSchema);

module.exports = bankData;


