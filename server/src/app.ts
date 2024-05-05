// src/app.ts
import express from 'express';
import routes from './routes';  // Make sure routes are defined correctly in this import
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json()); // Example of middleware that parses JSON requests

// Use routes
app.use(routes);

console.log(process.env.PORT); // Outputs: 4000
export default app;

