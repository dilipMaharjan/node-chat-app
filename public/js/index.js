var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = $('<li></li>')
  li.text(`${message.from} : ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location.</a>');
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});
$('#message-form').on('submit', (e) => {
  e.preventDefault();
  socket.emit("createMessage", {
    from: 'John',
    text: $('[name=message]').val()
  }, () => {
  });
});

$('#send-location').on('click', () => {
  if (!navigator.geolocation) {
    return alert("Your browser doesn't support geolocation.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert("Location couldn't be sent.")
  });

});