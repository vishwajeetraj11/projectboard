import { config } from './config/index';
import express from 'express';
import { connectDB } from './loaders/initDB';

const app = express();

connectDB();

app
  .listen(config.port, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
  })
  .on('error', err => {
    console.log(err);
    process.exit(1);
  });
