const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const PORT = 3000;
const app = express();
const server = createServer(app);

app.use(express.static('public/'));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '/index.html'))
});

// localhost:3000
server.listen(PORT, () => {
    console.log('server running at localhost:' + PORT);
});