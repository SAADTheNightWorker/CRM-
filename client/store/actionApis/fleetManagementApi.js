import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getFleetManagement = createAsyncThunk(
  "fleetManagement/getFleetManagement",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userRequest.get("/fleetManagement");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createFleetManagement = createAsyncThunk(
  "fleetManagement/createFleetManagement",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userRequest.post("/fleetManagement", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const updateFleetStatus = createAsyncThunk(
  "fleetManagement/updateFleetStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userRequest.put(`/fleetManagement/fleetApprove`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
