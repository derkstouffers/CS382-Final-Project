var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    userID: String, // Links a transaction document to the user currently logged in
    date: Date,
    merchantName: String,
    cost: Number,
    category: [String]
});

let transaction = mongoose.model('transaction', transactionSchema);

transactionSchema.statics.toTransactionDocument = function(data) {

    const transformedData = {
        userID: String,
        date: Date,
        merchantName: String,
        cost: Number,
        category: [String]
      };

    return new this(transformedData);
  };

module.exports = transaction;


