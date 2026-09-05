import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async (): Promise<typeof mongoose> => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: process.env.NODE_ENV !== 'production',
      maxPoolSize: 50, // Allows high concurrent reads for 100K users
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ Mongoose connection error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log('🍃 Mongoose connection closed');
};
