var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: moment(message.createdAt).format('h:mm a')
  });

  // console.log('newMessage', message);
  // var li = $('<li></li>')
  // li.text(`${moment(message.createdAt).format('h:mm a')} : ${message.from} -> ${message.text} `);
  $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {

  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location.</a>');
  // li.text(`${moment(message.createdAt).format('h:mm a')} : ${message.from}:`);
  // a.attr('href', message.url);
  // li.append(a);
  $('#messages').append(html);
});
$('#message-form').on('submit', (e) => {
  e.preventDefault();
  var messageText = $('[name=message]');
  socket.emit("createMessage", {
    from: 'John',
    text: messageText.val()
  }, function () {
    messageText.val('');
  });
});


$('#send-location').on('click', () => {
  if (!navigator.geolocation) {
    return alert("Your browser doesn't support geolocation.");
  }
  $('#send-location').attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    $('#send-location').removeAttr('disabled').text('Send location');

    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    $('#send-location').removeAttr('disabled').text('Send location');

    alert("Location couldn't be sent.")
  });
});