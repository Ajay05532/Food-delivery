import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  restaurantId: null,
  restaurantName: null,
  loading: false,
  image: null,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      // CASE 1: cart empty → set restaurant
      if (state.items.length === 0) {
        state.restaurantId = action.payload.restaurantId;
        state.restaurantName = action.payload.restaurantName;
        state.image = action.payload.image;
      }
      // CASE 2: different restaurant → ignore add and set error
      else if (state.restaurantId !== action.payload.restaurantId) {
        state.error = "You can only order from one restaurant at a time.";
        return;
      }

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        // Add new item to cart
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      // Update total quantity and price
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Update totals
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    // Increase item quantity
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;

        // Update totals
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      }
    },

    // Decrease item quantity
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity becomes 0
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }

        // Update totals
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      }
    },

    // Update item quantity
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.quantity = quantity;
        }

        // Update totals
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.restaurantId = null;
      state.restaurantName = null;
    },

    // Clear cart and add new item from different restaurant
    clearCartAndAddItem: (state, action) => {
      // Clear current cart
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      // Set new restaurant
      state.restaurantId = action.payload.restaurantId;
      state.restaurantName = action.payload.restaurantName;
      state.image = action.payload.image;

      // Add the new item
      state.items.push({
        ...action.payload,
        quantity: action.payload.quantity || 1,
      });

      // Update totals
      state.totalQuantity = action.payload.quantity || 1;
      state.totalPrice = action.payload.price * (action.payload.quantity || 1);
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateItemQuantity,
  clearCart,
  clearCartAndAddItem,
  setLoading,
  setError,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;
