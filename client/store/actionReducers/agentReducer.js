import { createSlice } from "@reduxjs/toolkit";
import { getAgent } from "../actionApis/agentAPi";

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAgent.fulfilled, (state, action) => {
        state.agents = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default agentSlice.reducer;
