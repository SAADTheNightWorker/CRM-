import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const PolicyChartApi = createAsyncThunk(
  "policyChart/getPolicyChart",
  async (data, { rejectWithValue }) => {
    console.log("data From Action Api", data);

    try {
      const response = await userRequest.get("/policyData", { params: data });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
