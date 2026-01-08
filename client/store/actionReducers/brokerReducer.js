import { createSlice } from "@reduxjs/toolkit";
import { getBroker } from "../actionApis/brokerApi";

const brokerSlice = createSlice({
  name: "broker",
  initialState: {
    broker: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBroker.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBroker.fulfilled, (state, action) => {
        state.broker = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBroker.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default brokerSlice.reducer;
