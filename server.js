const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('node:http');
const { join } = require('node:path');
const PORT = 3000;
const app = express();
const server = createServer(app);

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017");
}

main().then(function() {
    console.log("Mongoose connected!");
}).catch(err => console.log(err));

const userModel = require('./src/models/user.js');

app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true})); // getting rid of that dang error. if code breaks, delete the parameter
app.use(express.json());

app.use(express.static('public/'));


// Import routes
const user = require('./src/routes/user.js');
const settings = require('./src/routes/settings.js');
const bills = require('./src/routes/bills.js');

app.use('/user', user);
app.use('/settings', settings);
app.use('/bills', bills);

const bank = require('./src/routes/bank.js');
app.use('/bank', bank);

const transactionsRoute = require('./src/routes/transaction.js');
app.use('/api/mongoDB/transaction', transactionsRoute); // DO NOT CHANGE THIS ROUTE - PERIOD.

// this route is to handle the dashboard calls
// need to always show the chart
require('./src/routes/user.js'); // contains the userID

app.get('/dashboard.html', (req, res) => {
    try{
        console.log("global: ", global.userID);
        console.log("Redirecting to user specific dashboard...");
        const redirectURL = `/pages/dashboard.html?userID=${global.userID}`;
        res.redirect(redirectURL); 
        console.log("... done redirecting.");

    }catch (error){
        console.error('error redirecting to dashboard');
        res.status(500).json({message : 'Server Error'});
    }
});


// localhost:3000
server.listen(PORT, () => {
    console.log('server running at localhost:' + PORT);
});