import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/category");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/category", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/category", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeleteCategory = createAsyncThunk(
  "category/DeleteCategory",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/category", { data: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
