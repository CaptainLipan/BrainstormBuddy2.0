// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes';

dotenv.config();
const app = express();
app.use(express.json());  // Parses incoming JSON requests
connectDB();

app.use('/api', routes);

export default app;
