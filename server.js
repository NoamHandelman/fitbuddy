import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import morgan from 'morgan';

import authRouter from './routes/authRouter.js';
import postRouter from './routes/postRouter.js';
import profileRouter from './routes/profileRouter.js';

import { handleError } from './middlewares/handleError.js';
import { authenticateUserByToken } from './middlewares/authenticateUser.js';

app.use(express.json());

app.use(morgan('tiny'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', authenticateUserByToken, postRouter);
app.use('/api/v1/profile', authenticateUserByToken, profileRouter);

app.use(handleError);

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
