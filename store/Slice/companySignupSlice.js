import Address from "@/components/profile/Address";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerCompanyBasicInfo,
  createCompanyPassword,
  createCompanyAddress,
  companySignupOtp,
  resendOtpCompanySignup,
} from "../../services/service";

export const registerCompanyInfo = createAsyncThunk(
  "companyRegister/registerCompanyInfo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerCompanyBasicInfo(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const registerCompanyCredentials = createAsyncThunk(
  "companyRegister/registerCompanyCredentials",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createCompanyPassword(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const addCompanyAddress = createAsyncThunk(
  "companyRegister/addCompanyAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createCompanyAddress(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const verifyCompanySignupOtp = createAsyncThunk(
  "companyRegister/verifyCompanySignupOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await companySignupOtp(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const companyResendSignupOtp = createAsyncThunk(
  "companyRegister/companyResendSignupOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await resendOtpCompanySignup(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  createPassword: null,
  //   userInfo: {
  //     firstName: "",
  //     lastName: "",
  //     mobileNo: "",
  //     dob: "",
  //   },
  companyInfo: {
    firstName: "",
    lastName: "",
    companyName: "",
    mobileNo: "",
  },
  verifyOTP: null,
  verifyEmailOtp: null,
  resendOTP: null,
  forgetPassword: null,
  resetPassword: null,
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  emailAddress: "",
};

export const companySignupSlice = createSlice({
  name: "companyRegister",
  initialState: initialState,
  reducers: {
    setCompanyRegisterData: (state, action) => {
      state.companyInfo.firstName = action.payload.firstName;
      state.companyInfo.lastName = action.payload.lastName;
      state.companyInfo.mobileNo = action.payload.mobileNo;
      state.companyInfo.companyName = action.payload.companyName;
      state.address1 = action.payload.address1;
      state.address2 = action.payload.address2;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.pincode = action.payload.pincode;
      state.emailAddress = action.payload.emailAddress;
    },
  },
  extraReducers: {
    // registerCompanyInfo
    [registerCompanyInfo.pending]: (state) => {
      state.companyInfo = null;
      state.loading = true;
    },
    [registerCompanyInfo.fulfilled]: (state, action) => {
      state.companyInfo = action.payload;
      state.loading = false;
    },
    [registerCompanyInfo.rejected]: (state) => {
      state.companyInfo = null;
      state.loading = false;
    },

    // register Credentials
    [registerCompanyCredentials.pending]: (state) => {
      state.createPassword = null;
      state.loading = true;
    },
    [registerCompanyCredentials.fulfilled]: (state, action) => {
      state.createPassword = action.payload;
      state.loading = false;
    },
    [registerCompanyCredentials.rejected]: (state) => {
      state.createPassword = null;
      state.loading = false;
    },

    // Add Company Address
    [addCompanyAddress.pending]: (state) => {
      state.address1 = null;
      state.address2 = null;
      state.city = null;
      state.state = null;
      state.pincode = null;
      state.loading = true;
    },
    [addCompanyAddress.fulfilled]: (state, action) => {
      state.address1 = action.meta.arg.address1;
      state.address2 = action.meta.arg.address2;
      state.city = action.meta.arg.city;
      state.state = action.meta.arg.state;
      state.pincode = action.meta.arg.pincode;
      state.loading = false;
    },
    [addCompanyAddress.rejected]: (state) => {
      state.address1 = null;
      state.address2 = null;
      state.city = null;
      state.state = null;
      state.pincode = null;
      state.loading = false;
    },

    [companyResendSignupOtp.pending]: (state) => {
      state.companyResendSignupOtp = null;
      state.loading = true;
    },
    [companyResendSignupOtp.fulfilled]: (state, action) => {
      state.companyResendSignupOtp = action.payload;
      state.loading = false;
    },
    [companyResendSignupOtp.rejected]: (state) => {
      state.resetPassword = null;
      state.loading = false;
    },
  },
});
export const { setCompanyRegisterData } = companySignupSlice.actions;
export default companySignupSlice.reducer;
