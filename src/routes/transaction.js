const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import the transaction schema
const transactions = require('../models/transaction.js');

// import Plaid methods
const plaid = require('./bank.js');

// GET transactions
// A route to get all transactions
app.get('api/mongoDB/transaction', async (req, res) => {
    try{
        const allTransactions = await transactions.find();
        console.log('transaction api call completed.');
        res.json(allTransactions);

    }catch (error){
        console.error("Error getting transactions. Check API call!")
        res.status(500).json({message : 'Server Error'});
    }
});


module.exports = router;