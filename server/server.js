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
});

server.listen(port, () => console.log(`Server is up and running on port ${port}`));
