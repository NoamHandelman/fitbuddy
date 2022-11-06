import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features.js/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
