import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAdminDashboardDetailsService,
  fetchDashboardDetailService,
  getCardDetails,
  getCardPinChangeUrl,
  readNotificationStatusService,
} from "../services/service";

export const fetchDashboardDetail = createAsyncThunk(
  "dashboard/fetchDashboardDetail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchDashboardDetailService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const fetchAdminDashboardDetails = createAsyncThunk(
  "dashboard/fetchAdminDashboardDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAdminDashboardDetailsService(formData);
      const data = await response?.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const fetchCardDetails = createAsyncThunk(
  "dashboard/fetchCardDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await getCardDetails(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const changeCardPin = createAsyncThunk(
  "dashboard/changeCardPin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await getCardPinChangeUrl(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const readNotificationStatus = createAsyncThunk(
  "dashboard/readNotificationStatus",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await readNotificationStatusService(formData);
      const data = await response;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
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
    // fetchDashboardDetail
    [fetchDashboardDetail.pending]: (state) => {
      state.loading = true;
    },
    [fetchDashboardDetail.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchDashboardDetail.rejected]: (state) => {
      state.data = null;
      state.loading = false;
    },
    // fetchAdminDashboardDetails
    [fetchAdminDashboardDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchAdminDashboardDetails.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchAdminDashboardDetails.rejected]: (state) => {
      state.data = null;
      state.loading = false;
    },
    // fetchCardDetails
    [fetchCardDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchCardDetails.fulfilled]: (state) => {
      state.loading = false;
    },
    [fetchCardDetails.rejected]: (state) => {
      state.loading = false;
    },
    // changeCardPin
    [changeCardPin.pending]: (state) => {
      state.loading = true;
    },
    [changeCardPin.fulfilled]: (state) => {
      state.loading = false;
    },
    [changeCardPin.rejected]: (state) => {
      state.loading = false;
    },
  },
});
// export const { logout } = dashboardSlice.actions;
export default dashboardSlice.reducer;
