import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { config } from './config/index.js';
import { connectDB, initExpress } from './loaders/index.js';
connectDB();

try {
  const app = express();
  initExpress({ app });
  app.use(cors());

  const server = app
    .listen(config.port, () => {
      console.log(` 
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit(1);
    });

  const io = new Server(server, {
    pingTimeout: 60000,
    // allowEIO3: true,
    // allowUpgrades: true, // false by default // this needs to be provided when using v4 on server and v2.3 on client
    cors: {
      origin: 'https://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('connection established');
    socket.on('member-loggedIn', ({ member }) => {
      socket.join(member);
    });
    socket.on(
      'board_task_status_change',
      ({ member, updatedTask, memberIds }) => {
        memberIds.forEach((memb) => {
          if (memb === member) return;
          socket.in(memb).emit('board_update', { updatedTask });
        });
      }
    );

    socket.on('delete_task_update', ({ member, taskId, memberIds }) => {
      memberIds.forEach((memb) => {
        if (memb === member) return;
        socket.in(memb).emit('delete_update', { taskId });
      });
    });

    socket.on('create_task_update', ({ member, newTask, memberIds }) => {
      memberIds.forEach((memb) => {
        if (memb === member) return;
        socket.in(memb).emit('create_update', { newTask });
      });
    });

    socket.on('disconnect', () => {
      console.log('End......');
    });
  });
  io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
} catch (e) {
  console.log(e);
}
