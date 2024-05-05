const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('./user.js'); // contains the global userID

// import setting schemas
const settings = require('../models/settings.js');

router.get('api/mongoDB/setting', async (req, res) => {
    try{
        const allTransactions = await transactions.find();
        console.log('transaction api call completed.');
        res.json(allTransactions);

    }catch (error){
        console.error("Error getting transactions. Check API call!")
        res.status(500).json({message : 'Server Error'});
    }
});

router.post('/', async (req, res) => {
    const {darkMode, shortTermLowerBound, shortTermUpperBound, longTermLowerBound, longTermUpperBound, shortTermGoal, longTermGoal, shortTermDescription, longTermDescription, shortTermGoalProgress, longTermGoalProgress, shortTermGoalDeadline, longTermGoalDeadline } = req.body.settings;
    const userID = global.userID; // @sarah use this userID for everything else. if it breaks, it aint me
    console.log('settings', userID);

    try {
        let userSettings = await settings.findOne({ userID });

        if (!userSettings) {
            return res.status(404).send("Settings not found for the user.");
        } //End if

        else {
            userSettings.darkMode = darkMode;
            userSettings.shortTermLowerBound = shortTermLowerBound;
            userSettings.shortTermUpperBound = shortTermUpperBound;
            userSettings.longTermLowerBound = longTermLowerBound;
            userSettings.longTermUpperBound = longTermUpperBound;
            userSettings.shortTermGoal = shortTermGoal;
            userSettings.longTermGoal = longTermGoal;
            userSettings.shortTermDescription = shortTermDescription;
            userSettings.longTermDescription = longTermDescription;
            userSettings.shortTermGoalProgress = shortTermGoalProgress;
            userSettings.longTermGoalProgress = longTermGoalProgress;
            userSettings.shortTermGoalDeadline = shortTermGoalDeadline;
            userSettings.longTermGoalDeadline = longTermGoalDeadline;
        } //End else

        await userSettings.save();
        console.log("Settings saved successfully");
        res.redirect(`/pages/dashboard.html?userID=${userID}&status=success`);
        return;
    } //End try

    catch (error) {
        console.error(error);
        res.redirect("/pages/settings.html?error=settingsNotSaved");
        return;
    }
});

module.exports = router;