// src/index.ts
import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello  1234!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
