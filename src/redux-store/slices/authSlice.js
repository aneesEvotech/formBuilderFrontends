import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser() {
      return initialState;
    },
  },
});

export const { setUser, updateUser , logoutUser} = authSlice.actions;
export default authSlice.reducer;
