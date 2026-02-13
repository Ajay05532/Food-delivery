import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getRestaurants } from "../../services/restaurant.sevice";

// Helper function to load fallback data from public JSON files
const loadFallbackData = async () => {
  try {
    const [restaurantsResponse, addressesResponse] = await Promise.all([
      fetch("/food_delivery.restaurant.json"),
      fetch("/food_delivery.address.json"),
    ]);

    const restaurantsData = await restaurantsResponse.json();
    const addressesData = await addressesResponse.json();

    // Create a map of addresses by their ObjectId
    const addressMap = {};
    addressesData.forEach((addr) => {
      addressMap[addr._id.$oid] = {
        city: addr.city,
        area: addr.area,
        street: addr.street,
      };
    });

    // Link restaurants with their addresses
    const linkedRestaurants = restaurantsData.map((restaurant) => {
      const addressId = restaurant.address.$oid;
      const address = addressMap[addressId] || {};

      return {
        _id: restaurant._id.$oid,
        name: restaurant.name,
        coverImage: restaurant.coverImage,
        minDeliveryTime: restaurant.minDeliveryTime,
        maxDeliveryTime: restaurant.maxDeliveryTime,
        avgRating: restaurant.avgRating,
        address: address,
      };
    });

    return linkedRestaurants;
  } catch (error) {
    console.error("❌ Error loading fallback data:", error.message);
    return [];
  }
};

// Async Thunk to fetch restaurants
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchAll",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await getRestaurants(page, limit);
      return response; // Returns { success, data, pagination }
    } catch (error) {
      // If API fails, try loading fallback data
      console.log("⚠️ API failed, using fallback JSON data");
      try {
        const fallbackData = await loadFallbackData();

        // Apply pagination to fallback data
        const skip = (page - 1) * limit;
        const paginatedData = fallbackData.slice(skip, skip + limit);

        return {
          success: true,
          data: paginatedData,
          pagination: {
            total: fallbackData.length,
            currentPage: page,
            hasNextPage: skip + paginatedData.length < fallbackData.length,
          },
          source: "fallback",
        };
      } catch (fallbackError) {
        return rejectWithValue(fallbackError.message);
      }
    }
  },
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasNextPage: true,
    usedFallback: false,
  },
  reducers: {
    resetRestaurants: (state) => {
      state.items = [];
      state.page = 1;
      state.hasNextPage = true;
      state.usedFallback = false;
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
        state.page += 1; // Increment page for next call

        // Track if we're using fallback data
        if (action.payload.source === "fallback") {
          state.usedFallback = true;
        }
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { resetRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
