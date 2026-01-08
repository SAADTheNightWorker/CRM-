import { createSlice } from "@reduxjs/toolkit";
import { getVendor } from "../actionApis/vendorApi";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendors: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVendor.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVendor.fulfilled, (state, action) => {
        state.vendors = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default vendorSlice.reducer;
