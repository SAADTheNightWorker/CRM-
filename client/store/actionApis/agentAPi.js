import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getAgent = createAsyncThunk(
  "agent/getAgent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/agent");
      return response.data;
    } catch (error) {
      // Error handling: check if the error has a response and a data property
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createAgent = createAsyncThunk(
  "agent/createAgent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/agent", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateAgent = createAsyncThunk(
  "agent/updateAgent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/agent", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeleteAgent = createAsyncThunk(
  "agent/DeleteAgent",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/agent", { data: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
