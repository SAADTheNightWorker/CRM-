import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getVendor = createAsyncThunk(
  "vendor/getVendor",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await userRequest.get("/vendor");
      return responce.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || err.message || "An unknown error occurred"
      );
    }
  }
);

export const createVendor = createAsyncThunk(
  "vendor/createVendor",
  async (data, { rejectWithValue }) => {
    try {
      const responce = await userRequest.post("/vendor", data);
      return responce.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || err.message || "An unknown error occurred"
      );
    }
  }
);

export const updateVendor = createAsyncThunk(
  "vendor/updateVendor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/vendor", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeleteVendor = createAsyncThunk(
  "vendor/DeleteVendor",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/vendor", { data: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
