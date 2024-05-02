const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import user schemas
const settings = require('../models/settings');

router.post('/settings', (req, res) => {
    console.log("Testing in setting");
});

module.exports = settings;