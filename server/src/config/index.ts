import dotenv from 'dotenv';
import path from 'path';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// const __dirname = path.resolve();
const envFound = dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mongodb
   */
  DB_URI: process.env.MONGODB_URI,
  DB_PASS: process.env.DB_PASSWORD,
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};
