var socketIo = io();
socketIo.on('connect', () => {
    console.log('Connected to server.')
    socketIo.emit('createEmail', {
        to: 'to@email.com',
        text: 'this is a text'
    });
    socketIo.emit('createMessage', {
        from: 'John',
        text: 'yo,wassup?'
    });
});
socketIo.on('disconnect', () => {
    console.log('Disconnected from server.')
});
socketIo.on('newMessage', (message) => {
    console.log(message)
});
