import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { RootState } from '@/redux/store'

interface SubredditDetail {
  success: string | null;
}

interface LeaveSubredditState {
  loading: boolean | undefined;
  error: string | null;
  success: string | null;
}

interface UnsubscribeArg {
  subredditName: string | null;
}

const initialState: LeaveSubredditState = {
  loading: false,
  error: null,
  success: null,
};

export const unsubscribe = createAsyncThunk<SubredditDetail, UnsubscribeArg, { state: RootState }>(
  'leaveSubreddit/unsubscribe',
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
      await axios.put(`/api/subreddit/${subredditName}/unsubscribe/`, {}, config);
      return { success: 'Unsubscribed successfully' };
    }
    catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.message ? err.message : err.response?.data)
    }
  }
);

const leaveSubredditSlice = createSlice({
  name: 'leaveSubreddit',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(unsubscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(unsubscribe.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(unsubscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null
      })
  },
});

export default leaveSubredditSlice.reducer;
export const { resetState } = leaveSubredditSlice.actions;
