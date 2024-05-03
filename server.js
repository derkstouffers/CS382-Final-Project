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


//Import routes
const user = require('./src/routes/user.js');
const settings = require('./src/routes/settings.js');
const bills = require('./src/routes/bills.js');

app.use('/user', user);
app.use('/settings', settings);
app.use('/bills', bills);

const bank = require('./src/routes/bank.js');
app.use('/bank', bank);



// localhost:3000
server.listen(PORT, () => {
    console.log('server running at localhost:' + PORT);
});