import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import morgan from 'morgan';

import authRouter from './routes/authRouter.js';

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

const startServer = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    app.listen(5000, () => {
      console.log('app is listening in port 5000');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
