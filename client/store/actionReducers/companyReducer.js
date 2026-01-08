import { createSlice } from "@reduxjs/toolkit";
import { getCompany } from "../actionApis/companyApi";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyName: [],
    isLoading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.companyName = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
