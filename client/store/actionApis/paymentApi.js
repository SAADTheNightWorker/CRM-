import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getPayment = createAsyncThunk(
  "payment/getPayment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/payment");
      return response.data;
    } catch (error) {
      // Error handling: check if the error has a response and a data property
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/payment", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/payment", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeletePayment = createAsyncThunk(
  "payment/DeletePayment",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/payment", { data: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
