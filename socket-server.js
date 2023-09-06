const express = require('express');
const http = require('http');
const cors = require('cors');

// Create Express application and HTTP server instances
const app = express();
const server = http.createServer(app);

// Create WebSocket server with CORS enabled
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// Enable CORS middleware for our application
app.use(cors());

/**
 * The handleClientConnection function is called when a client connects to the server. 
 * It takes one parameter, socket, which represents the socket connection to the client.
 * Inside this function, there are two event listeners, one for the 'disconnect' event and one for the 'draw' event.
 */
const handleClientConnection = (socket) => {
  console.log('Connection established');

  //event listener for the 'disconnect' event, When a client disconnects from the server, the 'disconnect' event is triggered, and the handleDisconnect function is called.
  socket.on('disconnect', handleDisconnect);

  //When the client-side sends a 'draw' event to the server, the 'draw' event is triggered, and the handleDrawing function is called.
  socket.on('draw', handleDrawing);
};

io.on('connection', handleClientConnection);

/**
 * handleDisconnect is called when a client disconnects from the server. it simply prints a message 
 * to the console the connection has been disconnected.
 */
const handleDisconnect = () => {
  console.log('Connection disconnected');
};

/**
 * handleDrawing function is called when a 'draw' event is received from a client.
 * It takes one parameter, data, which is the data sent by the client.
 */
const handleDrawing = (data) => {
  io.emit('draw', data);
};

/**
 * Start a server that listens on a specified port.
 *
 * If the "PORT" environment variable is set, the server will listen on that port.
 * Otherwise, the server will default to listening on port 3000.
 *
 * @throws {Error} If there is an error while starting the server.
 */
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});