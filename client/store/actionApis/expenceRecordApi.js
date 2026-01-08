import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getExpenceRecords = createAsyncThunk(
  "ExpenceRecord/getExpenceRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/expenceRecord");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);

export const createExpenceRecords = createAsyncThunk(
  "ExpenceRecord/createExpenceRecords",
  async (data, { rejectWithValue }) => {
    for (let [key, value] of data.entries()) {
      console.log(`ACTION API >>> ${key}:`, value);
    }
    try {
      const response = await userRequest.post("/expenceRecord", data);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const createApprove = createAsyncThunk(
  "ExpenceRecord/createApprooval",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/expenceRecord/approve", data);
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

// export const deletePolicyRecords = createAsyncThunk(
//   "policyRecord/deletePolicyRecords",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`/policyRecord/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || error.message || "An unknown error occurred"
//       );
//     }
//   }
// );
