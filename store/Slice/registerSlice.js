import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserPasswordService,
  registerUserInfoService,
  registerUserService,
} from "../../services/service";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerUserService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUserPassword = createAsyncThunk(
  "register/createUserPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createUserPasswordService(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUserInfo = createAsyncThunk(
  "register/registerUserInfo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerUserInfoService(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  createPassword: null,
  userInfo: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  // reducers: {
  //   logout: (state) => {
  //     state.user = null;
  //     state.token = null;
  //     state.refreshToken = null;
  //     state.loading = false;
  //   },
  // },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.data = null;
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [registerUser.rejected]: (state) => {
      state.data = null;
      state.loading = false;
    },
    // createUserPassword
    [createUserPassword.pending]: (state) => {
      state.createPassword = null;
      state.loading = true;
    },
    [createUserPassword.fulfilled]: (state, action) => {
      state.createPassword = action.payload;
      state.loading = false;
    },
    [createUserPassword.rejected]: (state) => {
      state.createPassword = null;
      state.loading = false;
    },
    // registerUserInfo
    [registerUserInfo.pending]: (state) => {
      state.userInfo = null;
      state.loading = true;
    },
    [registerUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    [registerUserInfo.rejected]: (state) => {
      state.userInfo = null;
      state.loading = false;
    },
  },
});
// export const { logout } = registerSlice.actions;
export default registerSlice.reducer;
