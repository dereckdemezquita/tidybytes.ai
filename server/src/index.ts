// server/src/index.ts

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth';
import uploadRouter from './routes/uploadTab';

dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
app.get('/api/test', (req, res) => {
    res.json({message: 'Hello, this is a test!'});
    console.log('Test endpoint was called!');
});

app.use(express.json());
app.use(authRouter);

app.use(uploadRouter);

mongoose.connect(process.env.MONGODB_URI!)

.then(() => console.log('Connected to MongoDB'))
.catch((error) => {
    console.error(`Could not connect to MongoDB because of ${error}`);
    process.exit(-1);
});

app.listen(3001, () => {
    console.log('Server is running at http://localhost:3001');
});
