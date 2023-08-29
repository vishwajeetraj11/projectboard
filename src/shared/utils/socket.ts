import io from 'socket.io-client';
let socket: any;
socket = io('https://projectboard.onrender.com', { transports: ['websocket'] });
socket.on('connect_error', (err: any) => {
  console.log(err);
  console.log(`Connection Error due to: ${err.message}`);
});

export default socket;
console.log('socket 1')