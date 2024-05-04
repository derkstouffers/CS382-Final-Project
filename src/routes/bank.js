const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

// read env vars from .env file
require('dotenv').config();
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS).split(
    ',',
  );

// Plaid API Calls
async function fetchPublicToken() {
    try {
      const response = await axios.post('https://sandbox.plaid.com/sandbox/public_token/create', {
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        institution_id: 'ins_109508', // Chase Bank 
        initial_products: PLAID_PRODUCTS
      });

      console.log("Public Token: " + response.data.public_token);
      return response.data.public_token;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async function fetchAccessToken() {
    try {
      const publicTokenResponse = await fetchPublicToken();
      const public_token = publicTokenResponse;
      const response = await axios.post('https://sandbox.plaid.com/item/public_token/exchange', {
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        public_token: public_token
      });
  
      console.log("Access Token: " + response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async function fetchTransactionSync() {
    try {
        const accessTokenResponse = await fetchAccessToken();
        // Wait for 5 seconds (5000 milliseconds) to give time for Plaid API
        // to generate data for the newly created access token
        await new Promise(resolve => setTimeout(resolve, 5000)); 
    
      const access_token = accessTokenResponse;
      const response = await axios.post('https://sandbox.plaid.com/transactions/sync', {
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        access_token: access_token,
        count: 5 // Number of entries
      });
    //   console.log("Transaction Sync: " + JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

    // Helper Functions to fetch manipulate data
    // from /transactions/sync endpoint

    // Precondition: Array containing dictionaries of transactions info
    // Postconditio: Array of dictionaries containing wanted transaction info per transaction
    function GetTransactionList(data) {
        let transactions = [];
        for(let i = 0; i < data.length; i++){
            let currentTransaction = data[i];
            let transaction = {
                "date": currentTransaction.authorized_date, // Date
                "merchantName": currentTransaction.merchant_name, // String
                "cost": currentTransaction.amount, // Number
                "category": currentTransaction.category // array of the categories transaction falls under
            }
            transactions.push(transaction);
        }
        return transactions;
    }

    // Precondition: Array containing dictionaries of account info
    // Postconditio: Array of dictionaries containing wanted account info per account
    function GetAccountInfo(data) {
        let accounts = [];
        for(let i = 0; i < data.length; i++){
            let currentAccount = data[i];
            let account = {
                "account_id": currentAccount.account_id,
                "account_name": currentAccount.official_name,
                "subtype": currentAccount.subtype,
                "current_balance_available": currentAccount.balances.current
            }
            accounts.push(account);
        }
        return accounts;
    }
    
  // Routes to validate the output of API Calls
  // TODO: Remove before final submission
  router.get('/public-token', (req, res) => {
    ans = fetchPublicToken();
    res.send('public-token fetched');
  });

  router.get('/access-token', (req, res) => {
    ans = fetchAccessToken();
    res.send('access-token fetched');
  });

  router.get('/transaction-sync', async (req, res) => {
    try {
      const transactionSyncResponse = await fetchTransactionSync();
      console.log(transactionSyncResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Routes to examine the output the above helper functions
  // TODO: Remove before final submission
  router.get('/test-1', async (req, res) => {
    try {
      const transactionSyncResponse = await fetchTransactionSync();
      console.log(transactionSyncResponse.accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/test-2', async (req, res) => {
    try {
      const transactionSyncResponse = await fetchTransactionSync();
      console.log(transactionSyncResponse.added);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/test-3', async (req, res) => {
    try {
      const transactionSyncResponse = await fetchTransactionSync();
      let transactions = GetTransactionList(transactionSyncResponse.added);
      console.log(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/test-4', async (req, res) => {
    try {
      const transactionSyncResponse = await fetchTransactionSync();
      let accounts = GetAccountInfo(transactionSyncResponse.accounts);
      console.log(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



module.exports = router;
// Export the functions separately
module.exports.fetchTransactionSync = fetchTransactionSync;
module.exports.GetTransactionList = GetTransactionList;
module.exports.GetAccountInfo = GetAccountInfo;