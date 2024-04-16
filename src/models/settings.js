var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new mongoose.Schema({
    // TODO: Expand settings schema
    userID: String, // Links a settings document to an associated user
    darkMode: { type: Boolean, default: false },
    shortTermLowerBound: { type: Number, default: null },
    shortTermUpperBound: { type: Number, default: null },
    longTermLowerBound: { type: Number, default: null },
    longTermUpperBound: { type: Number, default: null }
});

let settings = mongoose.model('settings', settingsSchema);

module.exports = settings;


