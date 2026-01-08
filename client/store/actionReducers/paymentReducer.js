import { createSlice } from "@reduxjs/toolkit";
import { getPayment } from "../actionApis/paymentApi";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPayment.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
