import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getBroker = createAsyncThunk(
  "broker/getBroker",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/broker");
      return response.data;
    } catch (error) {
      // Error handling: check if the error has a response and a data property
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createBroker = createAsyncThunk(
  "broker/createBroker",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/broker", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateBroker = createAsyncThunk(
  "broker/updateBroker",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/broker", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeleteBroker = createAsyncThunk(
  "broker/DeleteBroker",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/broker", { data: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
