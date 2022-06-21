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
      console.log("data", data);
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
  },
  extraReducers: {
    [userLogin.pending]: () => {
      return { ...initialState, loading: true };
    },
    [userLogin.fulfilled]: (state, action) => {
      let data = {
        token: action.payload.access_token,
        refreshToken: action.payload.expires_in,
        role: action.payload.role,
        token_type: action.payload.token_type,
        loading: false,
      };

      return data;
    },
    [userLogin.rejected]: () => {
      return initialState;
    },
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
