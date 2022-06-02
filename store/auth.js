import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload?.token;
      state.refreshToken = action.payload?.refreshToken;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export default authSlice.reducer;

export const { setUser, updateUser, logout } = authSlice.actions;
