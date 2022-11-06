import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  user: null,
};

export const setUser = createAsyncThunk(
  'user/setUser',
  async (userData, thunkAPI) => {
    const { email, password, username, endPoint } = userData;
    const { data } = await axios.post(`/api/v1/auth/${endPoint}`, userData);
    console.log(data);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
});

export default userSlice.reducer;
