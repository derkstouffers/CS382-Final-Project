const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io'); 

const app = express();
const server = createServer(app);

app.use(express.static('public/'));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
});

// localhost:3000
server.listen(3000, () => {
    console.log('server running at localhost:3000');
});