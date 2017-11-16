const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, './../public');

const app = express();

var server = http.createServer(app);
var io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New user connected.');
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});




//middleware registration to server html
app.use(express.static(publicPath));

//listening at port 3000
server.listen(port, () => {
    console.log(`App started at ${port}`)
});