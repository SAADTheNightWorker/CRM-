import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getCompany = createAsyncThunk(
  "company/getCompany",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/company");
      return response.data;
    } catch (error) {
      // Error handling: check if the error has a response and a data property
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/company", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/company", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeleteCompany = createAsyncThunk(
  "company/DeleteCompany",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/company", { data: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
