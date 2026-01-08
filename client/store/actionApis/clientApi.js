import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getClient = createAsyncThunk(
  "client/getClient",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/client");
      return response.data;
    } catch (error) {
      // Error handling: check if the error has a response and a data property
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createClient = createAsyncThunk(
  "client/createClient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/client", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/client", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const DeleteClient = createAsyncThunk(
  "client/DeleteClient",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/client", { data: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
