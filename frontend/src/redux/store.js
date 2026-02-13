import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import restaurantsReducer from "./slices/restaurantSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    restaurants: restaurantsReducer,
  },
});

export default store;