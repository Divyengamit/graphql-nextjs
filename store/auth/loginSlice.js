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
      console.log("action data1111111", action);
      let data = {
        user: action.payload.entityId,
        token: action.payload.access_token,
        refreshToken: action.payload.expires_in,
        loading: false,
      };

      return data;
      // console.log("action data", data);
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
