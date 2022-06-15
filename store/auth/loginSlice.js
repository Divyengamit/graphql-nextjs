import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/service";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (formData, { rejectWithValue }) => {
    try {
      let tempData = {
        emailAddress: formData.email,
        password: formData.password,
      };
      const response = await login(tempData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  is2FA: false,
};

export const loginSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      // console.log("action data", action);
      state.user = action.payload.entityId;
      state.token = action.payload.access_token;
      state.refreshToken = action.payload.expires_in;
      state.loading = false;
    },
    [userLogin.rejected]: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
    },
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
