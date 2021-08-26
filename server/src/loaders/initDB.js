import mongoose from 'mongoose';
import { config } from '../config/index.js';

export const connectDB = async () => {
  try {
    let database_url = config.databaseURL;
    database_url = database_url.replace('<password>', config.databasePassword);

    const connection = await mongoose.connect(database_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    // process.exit(1) -> it going to exit with failure
    process.exit(1);
  }
};
