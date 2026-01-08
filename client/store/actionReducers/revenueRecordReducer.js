import { createSlice } from "@reduxjs/toolkit";
import { getRevenueRecord } from "../actionApis/revenueApi";

const revenueRecordSlice = createSlice({
  name: "revenue",
  initialState: {
    revenueRecord: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRevenueRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRevenueRecord.fulfilled, (state, action) => {
        state.revenueRecord = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getRevenueRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default revenueRecordSlice.reducer;
