var mongoose = require("mongoose");

let settingsSchema = new mongoose.Schema({
    // TODO: Implement settings schema
});

let settings = mongoose.model('settings', settingsSchema);

module.exports = settings;


