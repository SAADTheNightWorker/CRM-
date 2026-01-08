import { createSlice } from "@reduxjs/toolkit";
import { getPolicyRecords } from "../actionApis/policyRecordApi";

const policyRecordSlice = createSlice({
  name: "policyRecord",
  initialState: {
    policyRecord: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPolicyRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPolicyRecords.fulfilled, (state, action) => {
        state.policyRecord = action.payload;
        state.isLoading = false;
      })
      .addCase(getPolicyRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default policyRecordSlice.reducer;
