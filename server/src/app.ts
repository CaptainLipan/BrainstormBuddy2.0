// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes';
import cors from 'cors';

dotenv.config();
const app = express();
// CORS configuration for development
const corsOptions = {
    origin: 'http://localhost:3000',  // Allowing the frontend to make requests
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use('/api', routes);

export default app;
