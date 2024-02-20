import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

  interface Subreddit {
    name: string;
  }

  interface SubredditState {
    subreddits: Subreddit[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: SubredditState = {
    subreddits: [],
    loading: false,
    error: null
  }
  
  export const fetchSubreddits = createAsyncThunk(
    'subredditList/fetchSubreddits',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get<Subreddit[]>(`/api/subreddits`)
        return data
      } catch (error) {
        const err = error as AxiosError
        return rejectWithValue(err.response?.data)
      }
    }
  )
  

const subredditListSlice = createSlice({
  name: 'subredditList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.loading = false
        state.subreddits = action.payload
        state.error = null
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  }
})

export default subredditListSlice.reducer
