const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import user schemas
const settings = require('../models/settings.js');

router.post('/', async (req, res) => {
    const { userID, darkMode, shortTermLowerBound, shortTermUpperBound, longTermLowerBound, longTermUpperBound, shortTermGoal, longTermGoal, shortTermDescription, longTermDescription, shortTermGoalProgress, longTermGoalProgress, shortTermGoalDeadline, longTermGoalDeadline } = req.body.settings;

    try {
        let userSettings = await settings.findOneAndUpdate({ userID });

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
            // userSettings.shortTermGoalProgress = shortTermGoalProgress;
            // userSettings.longTermGoalProgress = longTermGoalProgress;
            // userSettings.shortTermGoalDeadline = shortTermGoalDeadline;
            // userSettings.longTermGoalDeadline = longTermGoalDeadline;
        } //End else

        await userSettings.save();
        console.log("Settings saved successfully");
        res.redirect("/pages/dashboard.html");
        return;
    } //End try

    catch (error) {
        console.error(error);
        res.redirect("/pages/settings.html?error=settingsNotSaved");
        return;
    }
});

module.exports = router;