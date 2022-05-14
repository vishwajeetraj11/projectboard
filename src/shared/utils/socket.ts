import io from 'socket.io-client';
let socket: any;
socket = io('https://projectboard-backend.herokuapp.com/', { transports: ['websocket'] });
socket.on('connect_error', (err: any) => {
  console.log(err);
  console.log(`Connection Error due to: ${err.message}`);
});

export default socket;
