import {
  addAddressService,
  addEmailService,
  addPhoneNumberService,
  applyCardConfirmService,
  applyCardService,
  auth_2FAservice,
  changePasswordService,
  enable_2FAService,
  removeAddressService,
  removeInfoService,
  securityQuestionsService,
  setPrimaryAddressService,
  updateProfileService,
  verify_2FAService,
} from "@/services/service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateProfileService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const addAddress = createAsyncThunk(
  "profile/addAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addAddressService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const setPrimaryAddress = createAsyncThunk(
  "profile/setPrimaryAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await setPrimaryAddressService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const removeAddress = createAsyncThunk(
  "profile/removeAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await removeAddressService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const addEmail = createAsyncThunk(
  "profile/addEmail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addEmailService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const removeInfo = createAsyncThunk(
  "profile/removeInfo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await removeInfoService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const addPhoneNumber = createAsyncThunk(
  "profile/addPhoneNumber",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addPhoneNumberService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const applyCardConfirm = createAsyncThunk(
  "profile/applyCardConfirm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await applyCardConfirmService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await changePasswordService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const verify_2FA = createAsyncThunk(
  "profile/verify_2FA",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await verify_2FAService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const enable_2FA = createAsyncThunk(
  "profile/enable_2FA",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await enable_2FAService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const auth_2FA = createAsyncThunk(
  "profile/auth_2FA",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await auth_2FAservice(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

// on re send OTP
export const applyCard = createAsyncThunk(
  "profile/applyCard",
  async (entityId, { rejectWithValue }) => {
    try {
      const response = await applyCardService(entityId);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const securityQuestions = createAsyncThunk(
  "profile/securityQuestions",
  async (entityId, { rejectWithValue }) => {
    try {
      const response = await securityQuestionsService(entityId);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

const initialState = {
  loading: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  extraReducers: {
    // updateProfile pic
    [updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateProfile.rejected]: (state) => {
      state.loading = false;
    },
    // addAddress
    [addAddress.pending]: (state) => {
      state.loading = true;
    },
    [addAddress.fulfilled]: (state) => {
      state.loading = false;
    },
    [addAddress.rejected]: (state) => {
      state.loading = false;
    },
    // setPrimaryAddress
    [setPrimaryAddress.pending]: (state) => {
      state.loading = true;
    },
    [setPrimaryAddress.fulfilled]: (state) => {
      state.loading = false;
    },
    [setPrimaryAddress.rejected]: (state) => {
      state.loading = false;
    },
    // removeAddress
    [removeAddress.pending]: (state) => {
      state.loading = true;
    },
    [removeAddress.fulfilled]: (state) => {
      state.loading = false;
    },
    [removeAddress.rejected]: (state) => {
      state.loading = false;
    },
    // addEmail
    [addEmail.pending]: (state) => {
      state.loading = true;
    },
    [addEmail.fulfilled]: (state) => {
      state.loading = false;
    },
    [addEmail.rejected]: (state) => {
      state.loading = false;
    },
    // removeInfo
    [removeInfo.pending]: (state) => {
      state.loading = true;
    },
    [removeInfo.fulfilled]: (state) => {
      state.loading = false;
    },
    [removeInfo.rejected]: (state) => {
      state.loading = false;
    },
    // addPhoneNumber
    [addPhoneNumber.pending]: (state) => {
      state.loading = true;
    },
    [addPhoneNumber.fulfilled]: (state) => {
      state.loading = false;
    },
    [addPhoneNumber.rejected]: (state) => {
      state.loading = false;
    },
    // applyCardConfirm
    [applyCardConfirm.pending]: (state) => {
      state.loading = true;
    },
    [applyCardConfirm.fulfilled]: (state) => {
      state.loading = false;
    },
    [applyCardConfirm.rejected]: (state) => {
      state.loading = false;
    },
    // changePassword
    [changePassword.pending]: (state) => {
      state.loading = true;
    },
    [changePassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [changePassword.rejected]: (state) => {
      state.loading = false;
    },
    // verify_2FA
    [verify_2FA.pending]: (state) => {
      state.loading = true;
    },
    [verify_2FA.fulfilled]: (state) => {
      state.loading = false;
    },
    [verify_2FA.rejected]: (state) => {
      state.loading = false;
    },
    // enable_2FA
    [enable_2FA.pending]: (state) => {
      state.loading = true;
    },
    [enable_2FA.fulfilled]: (state) => {
      state.loading = false;
    },
    [enable_2FA.rejected]: (state) => {
      state.loading = false;
    },
    // auth_2FA
    [auth_2FA.pending]: (state) => {
      state.loading = true;
    },
    [auth_2FA.fulfilled]: (state) => {
      state.loading = false;
    },
    [auth_2FA.rejected]: (state) => {
      state.loading = false;
    },
    // applyCard || on re send OTP
    [applyCard.pending]: (state) => {
      state.loading = true;
    },
    [applyCard.fulfilled]: (state) => {
      state.loading = false;
    },
    [applyCard.rejected]: (state) => {
      state.loading = false;
    },
    // securityQuestions
    [securityQuestions.pending]: (state) => {
      state.loading = true;
    },
    [securityQuestions.fulfilled]: (state) => {
      state.loading = false;
    },
    [securityQuestions.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;
