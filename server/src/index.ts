// server/src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const port: number = 5001;

import authRouter from './routes/authRouter';

dotenv.config();
const app = express();

app.use(express.json());
app.use(authRouter);

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error(`Could not connect to MongoDB because of ${error}`);
        process.exit(-1);
    });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});