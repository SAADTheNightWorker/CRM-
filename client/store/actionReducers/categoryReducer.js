import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../actionApis/categoryApi";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.categories = action.error.message;
      });
  },
});

export default categorySlice.reducer;
