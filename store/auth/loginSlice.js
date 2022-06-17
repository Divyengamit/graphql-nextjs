import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/service";
import { Encryption } from "../../utils/EncryptDecrypt";
import { setLocal } from "../../utils/storage";

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
      setLocal("access_token", data?.access_token);
      setLocal(
        "userId",
        Encryption(
          JSON.stringify({
            state: {
              // requestId: urlParamsData?.state?.requestId,
              // sessionId: sessionId,
              // mobile: mobile,
              userId: data?.entityId,
            },
          }),
          process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
        )
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
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
      let data = {
        user: action.payload.entityId,
        token: action.payload.access_token,
        refreshToken: action.payload.expires_in,
        loading: false,
      };

      return data;
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
