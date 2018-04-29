// Initiating a request to the server to open up a web socket and keep the connection open
var socket = io();

// Listen to a 'connect' event, built-in event -> when a server gets connected
socket.on('connect', function() {
  console.log('Connected to the server');

  // Emit the event only when connected, thus inside the 'connect' event
  // Emit a 'createMessage' event, custom event
  // socket.emit('createMessage', {
  //   from: 'Shailesh',
  //   text: 'Are you coming tonight for the party?'
  // });
});

// Listen to a 'disconnect' event, built-in event -> when a server gets disconnected
socket.on('disconnect', function() {
  console.log('Disconnected from the server');
});

// Listen to a 'newMessage' event, custom event -> when the server sends a newMessage event
socket.on('newMessage', function(message) {
  console.log('New Message', message);
});
