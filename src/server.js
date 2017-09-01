const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const leftPad = require('left-pad');

const port = 666;

// Serve all files in the public folder
app.use(express.static('src/public'));

// Allow the user to get the index.html from our source root
app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

// Set up socket.io
io.on('connection', (socket) => {
  console.log('Something connected!');
  socket.on('message', (msg) => {
    const date = new Date();
    io.emit('message', `${leftPad(date.getHours(), 2, '0')}:${leftPad(date.getMinutes(), 2, '0')}:${leftPad(date.getSeconds(), 2, '0')} - ${msg}`); // Hey boi, we send it right back atcha!
  });
});

server.listen(port);

console.log(`Server is running on "localhost:${port}/".`);
console.info('For a better experiance, open Spotify and search for Bohren & Der Club of Gore, the album "Piano Nights" or "Bohren For Beginners"');