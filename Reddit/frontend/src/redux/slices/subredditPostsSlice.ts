import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

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
  
  export const fetchSubredditPosts = createAsyncThunk(
    'postList/fetchSubredditPosts',
    async (subreddit_name, { rejectWithValue }) => {
      try {
        const { data } = await axios.get<Post[]>(`/api/subreddit/${subreddit_name}/posts/`)
        return data
      } catch (error) {
        const err = error as AxiosError
        return rejectWithValue(err.response?.data)
      }
    }
  )
  

const subredditPostsSlice = createSlice({
  name: 'subredditPosts',
  initialState,
  reducers: {
	resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
        state.error = null
      })
      .addCase(fetchSubredditPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  }
})

export default subredditPostsSlice.reducer
export const { resetState } = subredditPostsSlice.actions;
