import { createSlice } from "@reduxjs/toolkit";
import { getFleetManagement } from "../actionApis/fleetManagementApi";

const FleetManagementSlice = createSlice({
  name: "fleetManagement",
  initialState: {
    fleetManagement: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFleetManagement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFleetManagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fleetManagement = action.payload;
      })
      .addCase(getFleetManagement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default FleetManagementSlice.reducer;
