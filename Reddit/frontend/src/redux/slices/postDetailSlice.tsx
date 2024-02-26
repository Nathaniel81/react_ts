import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import {  RootState } from '@/redux/store'
// import { PostCreationRequest } from '@/lib/validators/post';



  interface post {}
  const initialState = {
    post: null,
    loading: false,
    error: null
  }

  interface FetchPostDetailsArg {
    id: string;
  }
  
  export const fetchPostDetails = createAsyncThunk<post, FetchPostDetailsArg>(
    'postDetails/fetchPostDetails',
    async (id, { rejectWithValue, getState }) => {
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
        const { data } = await axios.get<post>(`/api/post-detail/${id}/`, config)
        return data
      } catch (error) {
        const err = error as AxiosError
        return rejectWithValue(err.message ? err.message : err.response?.data)
      }
    }
  )
  

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false
        state.post = action.payload
        state.error = null
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  }
})

export default postDetailsSlice.reducer
export const { resetState } = postDetailsSlice.actions;
