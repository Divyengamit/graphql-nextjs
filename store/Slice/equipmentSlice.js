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
      return rejectWithValue(error?.response);
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
      return rejectWithValue(error?.response);
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
    businessStatus: "",
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
      // state.equipmentData.entityId = state.eligibilityData.entityId;
      // state.equipmentData.profileType = state.eligibilityData.profileType;
      // state.equipmentData.highestQualification =
      //   state.eligibilityData.highestQualification;
      // state.equipmentData.experience = action.payload.experience || "";
      // state.equipmentData.annualIncome = action.payload.annualIncome || "";
      // state.equipmentData.universityName = action.payload.universityName || "";
      // state.equipmentData.qualificationYear =
      //   action.payload.qualificationYear || null;
      // state.equipmentData.registrationNo = action.payload.registrationNo || "";
      // state.equipmentData.stateMedicalCouncil =
      //   action.payload.stateMedicalCouncil || "";
      // state.equipmentData.hospitalName = action.payload.hospitalName || "";
      // state.equipmentData.hospitalVintage =
      //   action.payload.hospitalVintage || "";
      // state.equipmentData.loanAmount = action.payload.loanAmount || "";
      // state.equipmentData.businessStatus = action.payload.businessStatus || "";
      // state.equipmentData.addressProof = action.payload.addressProof || null;
      // state.equipmentData.bankStmtFile = action.payload.bankStmtFile || null;
      // state.equipmentData.itrFile = action.payload.itrFile || null;
      // state.equipmentData.degreeCertificateFile =
      //   action.payload.degreeCertificateFile || null;
      // state.equipmentData.performaInvoiceFile =
      //   action.payload.performaInvoiceFile || null;
      // state.equipmentData.ownershipProofFile =
      //   action.payload.ownershipProofFile || null;

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
      // state.equipmentData = null;
      state.loading = false;
    },
  },
});
export const { setEquipmentDetails } = equipmentSlice.actions;
export default equipmentSlice.reducer;
