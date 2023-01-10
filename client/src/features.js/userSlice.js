import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customRequest } from '../utils/axios';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../utils/localStorage';

const initialState = {
  user: getUserFromLocalStorage() || null,
  isLoading: false,
};

export const setUser = createAsyncThunk(
  'user/setUser',
  async (userData, thunkAPI) => {
    const { endPoint } = userData;
    try {
      const { data } = await customRequest.post(`auth/${endPoint}`, userData);
      const { user, token } = data;
      return { user, token };
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
        const { user, token } = payload;
        state.user = { user, token };
        addUserToLocalStorage(state.user);
      })
      .addCase(setUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
