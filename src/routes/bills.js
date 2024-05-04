const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('./user.js'); // contains the global userID
//Import user schema
const bills = require('../models/bills.js');

router.post('/', async (req, res) => {
    const {name, amount, frequency, dueDate} = req.body.bills;
    const userID = global.userID;
    
    // TODO: figure out the userID undefined error here
    console.log("userID (currently in bill.js) ", userID);

    try {
        let userBills = await bills.findOne({userID});

        if (!userBills) {
            return res.status(404).send("Bills not found for the users.");
        }

        else {
            userBills.name = name;
            userBills.amount = amount;
            userBills.frequency = frequency;
            userBills.dueDate = dueDate;
        }
        
        await userBills.save();
        console.log("Bills saved successfully");
        res.redirect("/pages/dashboard.html");
        return;
    }

    catch (error) {
        console.error(error);
        res.redirect("/pages/bills.html?error=billsNotSaved");
        return;
    }
  });


  
  module.exports = router;