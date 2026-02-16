import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import restaurantsReducer from "./slices/restaurantSlice";
import orderReducer from "./slices/orderSlice";
import addressReducer from "./slices/addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    restaurants: restaurantsReducer,
    orders: orderReducer,
    address: addressReducer,
  },
});

export default store;
