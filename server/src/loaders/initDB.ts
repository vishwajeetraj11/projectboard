import { config } from '../config';
import mongoose from 'mongoose';

export const connectDB: () => void = async () => {
  try {
    let database_url = config.DB_URI;

    database_url = database_url.replace('<password>', config.DB_PASS);

    const connection = await mongoose.connect(database_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    // process.exit(1) -> it going to exit with failure
    process.exit(1);
  }
};
