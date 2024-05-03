const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Import user schema
const bills = require('../models/bills.js');

router.post('/', async (req, res) => {
    const {userID, name, amount, frequency, dueDate} = req.body.bills;
    
    try {
        let userBills = await bills.findOneAndUpdate({userID});

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