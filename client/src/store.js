import { configureStore } from '@reduxjs/toolkit';
import postSlice from './features.js/postSlice';
import userSlice from './features.js/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
});
