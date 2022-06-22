import {
  addAddressService,
  addEmailService,
  addPhoneNumberService,
  removeAddressService,
  removeInfoService,
  setPrimaryAddressService,
  updateProfileService,
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
  },
});

export default profileSlice.reducer;
