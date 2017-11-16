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

    //creating a custom event with data
    socket.emit('newMessage', {
        from: 'dilip',
        text: "My message",
        createdAt: 1234
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
    socket.on('createMessage', (message) => {
        console.log(message);
    });
});


//middleware registration to server html
app.use(express.static(publicPath));

//listening at port 3000
server.listen(port, () => {
    console.log(`App started at ${port}`)
});