import { createSlice } from "@reduxjs/toolkit";
import { getExpenceRecords } from "../actionApis/expenceRecordApi";

const expencrRecordSlice = createSlice({
  name: "expenceRecord",
  initialState: {
    expenceRecord: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpenceRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getExpenceRecords.fulfilled, (state, action) => {
        state.expenceRecord = action.payload;
        state.isLoading = false;
      })
      .addCase(getExpenceRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default expencrRecordSlice.reducer;
