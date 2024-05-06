// src/database.ts
import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI!); // Ensure this is the correct environment variable
    console.log('MongoDB connected successfully.');
};

export default connectDB;