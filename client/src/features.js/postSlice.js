import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customRequest } from '../utils/axios';

const initialState = {
  post: '',
  posts: [],
  likes: 0,
  isLoading: false,
  newPostOpen: false,
  editedPost: null,
};

export const addPost = createAsyncThunk(
  'post/addPost',
  async (post, thunkAPI) => {
    try {
      await customRequest.post(`post/addPost`, post);
      thunkAPI.dispatch(allPosts());
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async ({ post, id }, thunkAPI) => {
    try {
      console.log(post + ' from post slice');
      await customRequest.patch(`post/${id}`, { post });
      console.log(post);
      thunkAPI.dispatch(allPosts());
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const allPosts = createAsyncThunk(
  'post/allPosts',
  async (_, thunkAPI) => {
    try {
      const { data } = await customRequest(`post/allPosts`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (id, thunkAPI) => {
    try {
      await customRequest.delete(`post/${id}`);
      thunkAPI.dispatch(allPosts());
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    openNewPost: (state) => {
      state.newPostOpen = true;
    },
    closeNewPost: (state) => {
      state.newPostOpen = false;
      state.editedPost = null;
    },
    setEditPost: (state, action) => {
      state.isEditing = true;
      state.newPostOpen = true;
      state.editedPost = state.posts.find(
        (post) => post._id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.isLoading = false;
        state.newPostOpen = false;
      })
      .addCase(addPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(allPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload.posts;
      })
      .addCase(allPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state) => {
        state.isLoading = false;
        state.editedPost = null;
        state.newPostOpen = false;
      })
      .addCase(editPost.rejected, (state) => {
        state.isLoading = false;
        state.editedPost = null;
        state.newPostOpen = false;
      });
  },
});

export const { openNewPost, closeNewPost, setEditPost } = postSlice.actions;

export default postSlice.reducer;
