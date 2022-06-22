import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  equipmentFinance,
  equipmentFinanceEligibility,
} from "../../services/service";

export const checkEquipmentFinanceEligibility = createAsyncThunk(
  "equipment/checkEquipmentFinanceEligibility",
  async (formData, { rejectWithValue }) => {
    console.log("formData data", formData);
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
    console.log("formData data", formData);
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
    // setRegisterData: (state, action) => {
    //   state.userInfo.firstName = action.payload.firstName;
    //   state.userInfo.mobileNo = action.payload.mobileNo;
    //   state.dob = action.payload.dob;
    // },
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
      state.equipmentData = null;
      state.loading = true;
    },
    [applyEquipmentFinance.fulfilled]: (state, action) => {
      console.log("applyEquipmentFinance payload", action.payload);
      state.equipmentData = action.payload;
      state.loading = false;
    },
    [applyEquipmentFinance.rejected]: (state) => {
      state.equipmentData = null;
      state.loading = false;
    },
  },
});
// export const { setRegisterData } = equipmentSlice.actions;
export default equipmentSlice.reducer;
