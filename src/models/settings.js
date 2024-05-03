var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new mongoose.Schema({
    userID: String, // Links a settings document to an associated user
    darkMode: { type: Boolean, default: false },
    shortTermLowerBound: { type: Number, default: null },
    shortTermUpperBound: { type: Number, default: null },
    longTermLowerBound: { type: Number, default: null },
    longTermUpperBound: { type: Number, default: null },
    shortTermGoal: {type: String, default: null},
    longTermGoal: {type: String, default: null},
    shortTermDescription: { type: String, default: null },
    longTermDescription: { type: String, default: null }
    // shortTermGoalProgress: { type: Number, default: 0 },
    // longTermGoalProgress: { type: Number, default: 0 },
    // shortTermGoalDeadline: { type: Date, default: null },
    // longTermGoalDeadline: { type: Date, default: null }
});

let settings = mongoose.model('settings', settingsSchema);

module.exports = settings;


