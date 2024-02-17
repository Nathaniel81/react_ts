import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

interface UserState {
  userInfo: null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null
}

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }
      const { data } = await axios.post(`http://127.0.0.1:8000/api/user/login/`, { email, password }, config)
      localStorage.setItem('userInfo', JSON.stringify(data))
      return data
    } catch (error) {
		const err = error as AxiosError
		return rejectWithValue(err.response?.data)
    }
  }
)

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.error = null
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false
        state.userInfo = null
        state.error = action.error.message || null
      })
  }
})

export default userLoginSlice.reducer
