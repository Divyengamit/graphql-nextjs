import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {} from "../../services/service";

const initialState = {};

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
    // [registerUser.pending]: (state) => {
    //   state.data = null;
    //   state.loading = true;
    // },
    // [registerUser.fulfilled]: (state, action) => {
    //   state.data = action.payload;
    //   state.loading = false;
    // },
    // [registerUser.rejected]: (state) => {
    //   state.data = null;
    //   state.loading = false;
    // },
  },
});
// export const { setRegisterData } = equipmentSlice.actions;
export default equipmentSlice.reducer;
