import { createSlice } from "@reduxjs/toolkit";
import { PolicyChartApi } from "../actionApis/policyChartApi";

const PolicyChartSlice = createSlice({
  name: "policyChartData",
  initialState: {
    policyChartData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PolicyChartApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PolicyChartApi.fulfilled, (state, action) => {
        state.loading = false;
        state.policyChartData = action.payload;
        state.error = null;
      })
      .addCase(PolicyChartApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PolicyChartSlice.reducer;
