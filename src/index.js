import io from 'socket.io-client';

const socket = io.connect('localhost:666');
socket.on('connect', (client) => {
  console.log('Chat connected!');

  socket.emit('join', (data) => {
    console.log('Data was sent: ', data);
  });
});

socket.on('message', (msg) => {
  console.log('Received message: ', msg);
  const board = document.getElementById('message-board');

  const p = document.createElement('p');
  p.innerHTML = msg;
  board.appendChild(p);
});

document.getElementById('send').addEventListener('click', () => {
  const input = document.getElementById('input');
  socket.emit('message', input.value);
  input.value = '';
});
