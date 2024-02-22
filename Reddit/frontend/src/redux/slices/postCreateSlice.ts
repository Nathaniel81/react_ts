import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { PostCreationRequest } from '@/lib/validators/post';
import axios, { AxiosError } from 'axios'
import { RootState } from '@/redux/store'

interface PostsState {
  success: boolean | null;
  loading: string;
  error: string | null;
}

const initialState: PostsState = { success: null, loading: 'false', error: null };

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ title, content, subredditId }: PostCreationRequest, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const {
        userLogin: { userInfo },
      } = state

      const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo?.access}`
        }
      }
      const { data } = await axios.post('/api/post-list/', { title, content, subredditId }, config);
      return data;
    } catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.message ? err.message : err.response?.data)
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = 'true';
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = 'false';
        state.success = true;
      })
      .addCase(createPost.rejected, (state, action: PayloadAction<SerializedError>) => {
        state.loading = 'false';
        state.error = action.payload.message || null;
      });
  },
});

export const { resetState } = postsSlice.actions;

export default postsSlice.reducer;
