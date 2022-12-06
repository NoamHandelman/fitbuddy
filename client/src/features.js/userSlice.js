import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customRequest } from '../utils/axios';

const initialState = {
  user: null,
  isLoading: false,
};

export const setUser = createAsyncThunk(
  'user/setUser',
  async (userData, thunkAPI) => {
    const { endPoint } = userData;
    try {
      const { data } = await customRequest.post(`auth/${endPoint}`, userData);
      const { user } = data;
      console.log(data);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { username, email } = payload;
        const user = { username, email };
        state.user = user;
      })
      .addCase(setUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
