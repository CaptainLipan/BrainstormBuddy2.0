// src/index.ts
import 'dotenv/config';
import app from './app';
import connectDB from './database';

const PORT = process.env.PORT || 4000;

// Attempt to connect to the database and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});