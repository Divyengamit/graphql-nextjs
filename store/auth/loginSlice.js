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
  token: null,
  refreshToken: null,
  loading: false,
  role: null,
  token_type: null,
};

export const loginSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    setUser: (state, action) => {
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: {
    [userLogin.pending]: () => {
      return { ...initialState, loading: true };
    },
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload?.access_token;
      state.refreshToken = action.payload?.expires_in;
      state.role = action.payload?.role;
      state.token_type = action.payload?.token_type;
      state.loading = false;
    },
    [userLogin.rejected]: () => {
      return initialState;
    },
  },
});
export const { logout, setUser } = loginSlice.actions;
export default loginSlice.reducer;
