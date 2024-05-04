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
            userBill = new bills({
                userID,
                bills: []
            });
        }  
        
        if (!userBills.bills) {
            userBills.bills = [];
        }
        userBills.bills.push({name, amount, frequency, dueDate});
        
        await userBills.save();
        console.log("Bills saved successfully");
        res.redirect("/pages/dashboard.html?message=saveSuccess");
        return;
    }

    catch (error) {
        console.error(error);
        res.redirect("/pages/bills.html?error=billsNotSaved");
        return;
    }
  });


  
  module.exports = router;