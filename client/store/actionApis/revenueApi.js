import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getRevenueRecord = createAsyncThunk(
  "revenueRecord/getRevenueRecord",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/revenueRecord");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createRevenueRecord = createAsyncThunk(
  "revenueRecord/createRevenueRecord",
  async (data, { rejectWithValue }) => {
    // Log the formData entries
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await userRequest.post("/revenueRecord", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateRevenueRecord = createAsyncThunk(
  "revenueRecord/updateRevenueRecord",
  async (data, { rejectWithValue }) => {
    for (let [key, value] of data.entries()) {
      console.log(`API ${key}:`, value);
    }
    try {
      const response = await userRequest.put("/revenueRecord", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const DeleteRevenueRecord = createAsyncThunk(
  "RevenueRecord/DeleteRevenueRecord",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/revenueRecord", {
        data: data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
