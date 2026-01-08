import { createAsyncThunk } from "@reduxjs/toolkit";
import { authRequest, userRequest } from "../../apiRequests/apiRequest";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/user", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const userRestPassword = createAsyncThunk(
  "user/userRestPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put("/user/reset", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
)


// From Auth Router
export const userLogin = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authRequest.post("/auth", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authRequest.post("/auth/reset", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
