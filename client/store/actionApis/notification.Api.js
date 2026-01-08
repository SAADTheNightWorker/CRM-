import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getNotifications = createAsyncThunk(
  "Notifications/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/notifcation");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createNotifications = createAsyncThunk(
  "Notifications/createNotifications",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/notifcation", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateNotifications = createAsyncThunk(
  "Notifications/updateNotifications",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/notifcation", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeleteNotifications = createAsyncThunk(
  "Notifications/DeleteNotifications",
  async (id, { rejectWithValue }) => {
    console.log("FROM API", id);
    try {
      const response = await userRequest.delete("/notifcation", { data: id });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
