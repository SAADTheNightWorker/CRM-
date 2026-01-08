import { createSlice } from "@reduxjs/toolkit";
import { getClient } from "../actionApis/clientApi";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    isLoading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Save the error message in the error field
      });
  },
});

export default clientSlice.reducer;
