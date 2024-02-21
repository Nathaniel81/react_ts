import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import {  RootState } from '@/redux/store'


  interface Subreddit {
    id: string | null;
    name: string | null;
    created_at: string | null;
    updated_at: string | null;
    creator: string | null;
    members_count: string | null;
    is_subscriber: boolean | null;
  }

  interface SubredditState {
    subreddit: Subreddit;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: SubredditState = {
    subreddit: {
      name: null,
      created_at: null,
      updated_at: null,
      members_count: null,
      creator: null,
      is_subscriber: null
    },
    loading: false,
    error: null
  }

  interface FetchSubredditArg {
    name: string;
  }
  
  export const fetchSubreddit = createAsyncThunk<Subreddit, FetchSubredditArg>(
    'subredditDetail/fetchSubreddit',
    async ({ name }, { rejectWithValue, getState }) => {
      try {
        const state = getState() as RootState;
        const {
          userLogin: { userInfo },
        } = state

        const config : { headers: { 'Content-type': string; Authorization?: string }}= {
          headers: {
              'Content-type': 'application/json',
          }
        }
        if (userInfo) {
          config.headers.Authorization = `Bearer ${userInfo.access}`
        }
        const { data } = await axios.get<Subreddit>(`/api/subreddit/${name}`, config)
        return data
      } catch (error) {
        const err = error as AxiosError
        return rejectWithValue(err.message ? err.message : err.response?.data)
      }
    }
  )
  

const subredditDetailSlice = createSlice({
  name: 'subredditDetail',
  initialState,
  reducers: {
    resetDetailState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddit.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSubreddit.fulfilled, (state, action) => {
        state.loading = false
        state.subreddit = action.payload
        state.error = null
      })
      .addCase(fetchSubreddit.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  }
})

export default subredditDetailSlice.reducer
