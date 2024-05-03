var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new mongoose.Schema({
    userID: String,
    name: String,
    amount: Number,
    frequency: String,
    dueDate: Date
  });

const bills = mongoose.model('bills', billSchema);

module.exports = bills;