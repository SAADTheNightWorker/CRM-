import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../actionApis/notification.Api.js";

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default NotificationsSlice.reducer;
