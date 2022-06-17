import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserPasswordService,
  forgetPasswordService,
  registerUserInfoService,
  registerUserService,
  resendOTPService,
  resetPasswordService,
  uploadDocService,
  verifyEmailOtpService,
  verifyOTPService,
} from "../../services/service";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerUserService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const createUserPassword = createAsyncThunk(
  "register/createUserPassword",
  async (formData, { rejectWithValue }) => {
    try {
      // console.log("formData slice", formData);
      const response = await createUserPasswordService(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
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
      return rejectWithValue(error?.response);
    }
  }
);

export const uploadDoc = createAsyncThunk(
  "register/uploadDoc",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadDocService(formData);
      const data = await response.data;
      // console.log("data Slice", data);
      return data;
    } catch (error) {
      // console.log("data Slice", error);
      return rejectWithValue(error?.response);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "register/verifyOTP",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await verifyOTPService(formData);
      const data = await response.data;
      // console.log("data Slice", data);
      return data;
    } catch (error) {
      // console.log("data Slice", error);
      return rejectWithValue(error?.response);
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
  "register/verifyEmailOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await verifyEmailOtpService(formData);
      const data = await response.data;
      // console.log("data Slice", data);
      return data;
    } catch (error) {
      // console.log("data Slice", error);
      return rejectWithValue(error?.response);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "register/resendOTP",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await resendOTPService(formData);
      const data = await response.data;
      // console.log("data Slice", data);
      return data;
    } catch (error) {
      // console.log("data Slice", error);
      return rejectWithValue(error?.response);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "register/forgetPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await forgetPasswordService(formData);
      const data = await response.data;
      // console.log("data Slice", data);
      return data;
    } catch (error) {
      // console.log("data Slice", error);
      return rejectWithValue(error?.response);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "register/resetPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await resetPasswordService(formData);
      const data = await response.data;
      // console.log("data Slice", data);
      return data;
    } catch (error) {
      // console.log("data Slice", error);
      return rejectWithValue(error?.response);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  createPassword: null,
  userInfo: {
    firstName: "",
    lastName: "",
    mobileNo: "",
    dob: "",
  },
  uploadDoc: null,
  verifyOTP: null,
  verifyEmailOtp: null,
  resendOTP: null,
  forgetPassword: null,
  resetPassword: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.userInfo.firstName = action.payload.firstName;
      state.userInfo.mobileNo = action.payload.mobileNo;
      state.dob = action.payload.dob;
    },
  },
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
    // uploadDoc
    [uploadDoc.pending]: (state) => {
      state.uploadDoc = null;
      state.loading = true;
    },
    [uploadDoc.fulfilled]: (state, action) => {
      state.uploadDoc = action.payload;
      state.loading = false;
    },
    [uploadDoc.rejected]: (state) => {
      state.uploadDoc = null;
      state.loading = false;
    },
    // verifyOTP
    [verifyOTP.pending]: (state) => {
      state.verifyOTP = null;
      state.loading = true;
    },
    [verifyOTP.fulfilled]: (state, action) => {
      state.verifyOTP = action.payload;
      state.loading = false;
    },
    [verifyOTP.rejected]: (state) => {
      state.verifyOTP = null;
      state.loading = false;
    },
    // verifyEmailOtp
    [verifyEmailOtp.pending]: (state) => {
      state.verifyEmailOtp = null;
      state.loading = true;
    },
    [verifyEmailOtp.fulfilled]: (state, action) => {
      state.verifyEmailOtp = action.payload;
      state.loading = false;
    },
    [verifyEmailOtp.rejected]: (state) => {
      state.verifyEmailOtp = null;
      state.loading = false;
    },
    // resendOTP
    [resendOTP.pending]: (state) => {
      state.resendOTP = null;
      state.loading = true;
    },
    [resendOTP.fulfilled]: (state, action) => {
      state.resendOTP = action.payload;
      state.loading = false;
    },
    [resendOTP.rejected]: (state) => {
      state.resendOTP = null;
      state.loading = false;
    },
    //forgetPassword
    [forgetPassword.pending]: (state) => {
      state.forgetPassword = null;
      state.loading = true;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.forgetPassword = action.payload;
      state.loading = false;
    },
    [forgetPassword.rejected]: (state) => {
      state.forgetPassword = null;
      state.loading = false;
    },
    // resetPassword
    [resetPassword.pending]: (state) => {
      state.resetPassword = null;
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.resetPassword = action.payload;
      state.loading = false;
    },
    [resetPassword.rejected]: (state) => {
      state.resetPassword = null;
      state.loading = false;
    },
  },
});
export const { setRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
