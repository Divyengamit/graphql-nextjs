import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  equipmentFinance,
  equipmentFinanceEligibility,
} from "../../services/service";

export const checkEquipmentFinanceEligibility = createAsyncThunk(
  "equipment/checkEquipmentFinanceEligibility",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await equipmentFinanceEligibility(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const applyEquipmentFinance = createAsyncThunk(
  "equipment/applyEquipmentFinance",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await equipmentFinance(formData);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

const initialState = {
  equipmentData: {
    entityId: "",
    profileType: "",
    highestQualification: "",
    experience: "",
    annualIncome: "",
    universityName: "",
    qualificationYear: null,
    registrationNo: "",
    stateMedicalCouncil: "",
    hospitalName: "",
    hospitalVintage: "",
    loanAmount: "",
    // businessStatus: "",
    addressProof: null,
    bankStmtFile: null,
    itrFile: null,
    degreeCertificateFile: null,
    performaInvoiceFile: null,
    ownershipProofFile: null,
  },

  loading: false,
  eligibilityData: {},
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState: initialState,
  reducers: {
    setEquipmentDetails: (state, action) => {
      state.equipmentData = action.payload;
    },
  },
  extraReducers: {
    // FinanceEligibility
    [checkEquipmentFinanceEligibility.pending]: (state) => {
      state.eligibilityData = null;
      state.loading = true;
    },
    [checkEquipmentFinanceEligibility.fulfilled]: (state, action) => {
      state.eligibilityData = action.payload;
      state.loading = false;
    },
    [checkEquipmentFinanceEligibility.rejected]: (state) => {
      state.eligibilityData = null;
      state.loading = false;
    },
    // EquipmentFinance
    [applyEquipmentFinance.pending]: (state) => {
      state.loading = true;
    },
    [applyEquipmentFinance.fulfilled]: (state, action) => {
      // state.equipmentData = action.payload;
      state.loading = false;
    },
    [applyEquipmentFinance.rejected]: (state) => {
      state.equipmentData = null;
      state.loading = false;
    },
  },
});
export const { setEquipmentDetails } = equipmentSlice.actions;
export default equipmentSlice.reducer;
