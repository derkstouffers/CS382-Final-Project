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

  // Routes to validate the output of API Calls
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


module.exports = router;