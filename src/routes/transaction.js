const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import the transaction schema
const transactions = require('../models/transaction.js');

// import Plaid methods
const plaid = require('./bank.js');

// GET transactions
// A route to get all transactions
router.get('/', async (req, res) => {
    try{
        const {userID} = req.query;
        console.log("userID in router/transaction: ", req.query);
        const allTransactions = await transactions.find({userID});
        console.log('transaction api call completed.');
        res.json(allTransactions);

    }catch (error){
        console.error("Error getting transactions. Check API call!")
        res.status(500).json({message : 'Server Error'});
    }
});

// this may seem redundant, but DO NOT REMOVE,
// program breaks without it. same with above 
router.get('/api/mongoDB/transaction', async (req, res) => {
    try{
        const {userID} = req.query;
        console.log("userID in router/transaction: ", req.query);
        const allTransactions = await transactions.find({userID});
        console.log('transaction api call completed.');
        res.json(allTransactions);

    }catch (error){
        console.error("Error getting transactions. Check API call!")
        res.status(500).json({message : 'Server Error'});
    }
});


module.exports = router;