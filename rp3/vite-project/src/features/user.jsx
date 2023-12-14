import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: { value: { name: "", age: 0, email: "" } },
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload };
    }
  }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
