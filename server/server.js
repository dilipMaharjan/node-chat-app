const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var { generateMessage } = require('./util/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome New User.'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined.'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});