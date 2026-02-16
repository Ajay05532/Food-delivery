import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addressService } from "../../services/address.service";

// Async Thunks
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await addressService.getAddresses();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await addressService.getAddress(addressId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await addressService.addAddress(address);
      return response; // Backend returns the updated array of addresses
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await addressService.updateAddress(address);
      return response.address;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      await addressService.deleteAddress(addressId);
      return addressId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Addresses
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Single Address
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Option 1: Add to items if not present or update
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Address
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Payload is the new array of addresses
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Address
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Address
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddressError } = addressSlice.actions;
export default addressSlice.reducer;
