import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();
const app = express();

// CORS configuration for development
const corsOptions = {
    origin: 'http://localhost:3000',  // Allowing the frontend to make requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);

export default app;
