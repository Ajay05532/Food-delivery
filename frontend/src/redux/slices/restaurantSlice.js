import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurants } from "../../services/restaurant.sevice";

// Async Thunk to fetch restaurants
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchAll",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await getRestaurants(page, limit);
      return response; // Returns { success, data, pagination }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch restaurants");
    }
  },
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 0, // Track the last successfully loaded page
    hasNextPage: true,
  },
  reducers: {
    resetRestaurants: (state) => {
      state.items = [];
      state.currentPage = 0;
      state.hasNextPage = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        // APPEND new data to existing items for "Load More"
        state.items = [...state.items, ...action.payload.data];
        state.hasNextPage = action.payload.pagination.hasNextPage;
        state.currentPage = action.payload.pagination.currentPage; // Store the page we just loaded
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
