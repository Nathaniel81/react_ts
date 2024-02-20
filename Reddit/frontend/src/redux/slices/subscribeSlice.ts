import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { RootState } from '@/redux/store'

interface SubredditDetail {
  success: string | null;
}

interface JoinSubredditState {
  loading: boolean | null;
  error: string | null;
  success: string | null;
}

interface SubscribeArg {
  subredditName: string | null;
}

const initialState: JoinSubredditState = {
  loading: false,
  error: null,
  success: null,
};

export const subscribe = createAsyncThunk<SubredditDetail, SubscribeArg, { state: RootState }>(
  'joinSubreddit/subscribe',
  async ({ subredditName }, { rejectWithValue, getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()
      const config : { headers: { 'Content-type': string; Authorization?: string }}= {
        headers: {
            'Content-type': 'application/json',
        }
      }
      if (userInfo) {
        config.headers.Authorization = `Bearer ${userInfo.access}`
      }
      await axios.put(`/api/subreddit/${subredditName}/subscribe/`, {}, config);
      return { success: 'Subscribed successfully' };
    }
    catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.message ? err.message : err.response?.data)
    }
  }
);

const joinSubredditSlice = createSlice({
  name: 'joinSubreddit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null
      })
  },
});

export default joinSubredditSlice.reducer;
