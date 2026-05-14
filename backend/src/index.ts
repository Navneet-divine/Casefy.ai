import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

import userRoutes from './routes/uesr.routes';


// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

