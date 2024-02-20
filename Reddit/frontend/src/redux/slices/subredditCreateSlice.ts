import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import {  RootState } from '@/redux/store'
import { SerializedError } from '@reduxjs/toolkit';


  interface Subreddit {
    name: string;
  }

  interface SubredditState {
    subreddit: Subreddit | null;
    loading: boolean;
    error: string | SerializedError | null;
  }
  
  
  const initialState: SubredditState = {
    subreddit: null,
    loading: false,
    error: null
  }

  export const createSubreddit = createAsyncThunk(
    'subredditCreate/createSubreddit',
    async (subreddit: Subreddit, { getState, rejectWithValue }) => {
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
        const { data } = await axios.post<Subreddit>(`/api/subreddit`, subreddit, config)
        return data
      } catch (error) {
        const err = error as AxiosError
        return rejectWithValue(err.message ? err.message : err.response?.data)
      }
    }
  )


  const subredditCreateSlice = createSlice({
    name: 'subredditCreate',
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createSubreddit.pending, (state) => {
          state.loading = true
        })
        .addCase(createSubreddit.fulfilled, (state, action) => {
          state.loading = false
          state.subreddit = action.payload
          state.error = null
        })
        .addCase(createSubreddit.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload || null
        })
    }
  })
  
  export const { resetState } = subredditCreateSlice.actions;
  export default subredditCreateSlice.reducer
  