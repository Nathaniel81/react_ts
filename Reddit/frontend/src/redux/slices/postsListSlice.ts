import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import {  RootState } from '@/redux/store'

  interface Post {
    name: string;
  }

  interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: PostState = {
    posts: [],
    loading: false,
    error: null
  }
  
  export const fetchPosts = createAsyncThunk(
    'postsList/fetchPosts',
    async (_, { getState, rejectWithValue } ) => {
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

        const { data } = await axios.get<Post[]>(`/api/posts/`, config)
        return data
      } catch (error) {
        const err = error as AxiosError
        return rejectWithValue(err.response?.data)
      }
    }
  )
  

const postsListSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {
  resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
        state.error = null
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  }
})

export default postsListSlice.reducer
export const { resetState } = postsListSlice.actions;
