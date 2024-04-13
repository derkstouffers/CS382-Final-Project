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

// ADD THE `const userModel = require(path_to_user_model)

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('public/'));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '/index.html'))
});

//Import routes
const user = require('./src/routes/user.js');

// localhost:3000
server.listen(PORT, () => {
    console.log('server running at localhost:' + PORT);
});