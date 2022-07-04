import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTenantAdminService,
  addTenantService,
  deleteTenantService,
  fetchAdminTenantService,
} from "../../services/service";

export const addTenant = createAsyncThunk(
  "admin/addTenant",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addTenantService(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);
export const fetchAdminTenant = createAsyncThunk(
  "admin/fetchAdminTenant",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchAdminTenantService(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const addTenantAdmin = createAsyncThunk(
  "admin/addTenantAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addTenantAdminService(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const deleteTenant = createAsyncThunk(
  "admin/deleteTenant",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await deleteTenantService(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

const initialState = {
  loading: false,
  tenantAdminList: [],
};

export const equipmentSlice = createSlice({
  name: "admin",
  initialState: initialState,
  //   reducers: {
  //     setEquipmentDetails: (state, action) => {
  //       state.equipmentData = action.payload;
  //     },
  //   },
  extraReducers: {
    // addTenant
    [addTenant.pending]: (state) => {
      state.loading = true;
    },
    [addTenant.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addTenant.rejected]: (state) => {
      state.loading = false;
    },
    // fetchAdminTenant
    [fetchAdminTenant.pending]: (state) => {
      // state.loading = true;
    },
    [fetchAdminTenant.fulfilled]: (state, action) => {
      // state.loading = false;
      state.tenantAdminList = action.payload;
    },
    [fetchAdminTenant.rejected]: (state) => {
      // state.loading = false;
      state.tenantAdminList = [];
    },
    // addTenantAdmin
    [addTenantAdmin.pending]: (state) => {
      state.loading = true;
    },
    [addTenantAdmin.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addTenantAdmin.rejected]: (state) => {
      state.loading = false;
    },
    // deleteTenant
    [deleteTenant.pending]: (state) => {
      state.loading = true;
    },
    [deleteTenant.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteTenant.rejected]: (state) => {
      state.loading = false;
    },
  },
});
// export const { setEquipmentDetails } = equipmentSlice.actions;
export default equipmentSlice.reducer;
