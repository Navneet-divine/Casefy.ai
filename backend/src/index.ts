import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

