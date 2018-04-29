const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // returns websocket server

app.use(express.static(publicPath));

// Listen to a 'connection' event, built-in event -> when a client gets connected
io.on('connection', (socket) => {
  console.log('New user connected');

  // Listen to a 'disconnect' event, built-in event -> when a client gets disconnected
  socket.on('disconnect', () => {
    console.log('Client gets disconnected');
  });

  // Emit a 'newMessage' event, custom event -> when the server gets a new message
  // Emits an event to a single connection
  // socket.emit('newMessage', {
  //   from: 'Mike',
  //   text: 'No. Not tonight.',
  //   createdAt: 123456
  // });

  // Listen to a 'createMessage' event, custom event -> when the client sends a new message
  socket.on('createMessage', (message) => {

    // Emits an event to EVERY single connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => console.log(`Server is up and running on port ${port}`));
