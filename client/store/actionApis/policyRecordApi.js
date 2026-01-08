import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getPolicyRecords = createAsyncThunk(
  "policyRecord/getPolicyRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/policyRecord");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createPolicyRecords = createAsyncThunk(
  "policyRecord/createPolicyRecords",
  async (data, { rejectWithValue }) => {
    for (let [key, value] of data.entries()) {
      console.log(`ACTION API >>> ${key}:`, value);
    }
    try {
      const response = await userRequest.post("/policyRecord", data);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

// export const updatePolicyRecords = createAsyncThunk(
//   "policyRecord/updatePolicyRecords",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`/policyRecord/${data.id}`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || error.message || "An unknown error occurred"
//       );
//     }
//   }
// );

export const DeletePolicyRecord = createAsyncThunk(
  "PolicyRecord/DeletePolicyRecord",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/policyRecord", {
        data: data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
