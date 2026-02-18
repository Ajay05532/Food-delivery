import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartLocal,
  removeFromCart as removeFromCartLocal,
  updateItemQuantity as updateItemQuantityLocal,
  clearCart as clearCartLocal,
  clearCartAndAddItem as clearCartAndAddItemLocal,
  clearError,
  fetchCartFromServer,
  addToCartAsync,
  updateCartItemAsync,
  removeFromCartAsync,
  clearCartAsync,
} from "../slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();

  const {
    items,
    totalPrice,
    totalQuantity,
    restaurantId,
    restaurantName,
    image,
    loading,
    error,
  } = useSelector((state) => state.cart);

  /* ======================
     ADD TO CART
  ====================== */

  const addToCart = (item) => {
    console.log("🎯 addToCart received item:", item);
    console.log("🔍 item properties:", {
      id: item.id,
      _id: item._id,
      name: item.name,
      price: item.price,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      category: item.category,
    });

    if (!item.restaurantId) {
      return { success: false };
    }

    if (restaurantId && restaurantId !== item.restaurantId) {
      return {
        success: false,
        error: "You can only order from one restaurant at a time",
      };
    }

    // 🔹 FRONTEND NORMALIZATION
    const payload = {
      id: item.id, // frontend id (for cart state)
      menuItemId: item._id, // backend MongoDB ObjectId
      name: item.name, // NOT title
      image: item.image,
      category: item.category, // MUST exist
      price: item.price, // NOT cost
      quantity: 1,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      };

    // optimistic update
    dispatch(addToCartLocal(payload));

    // backend sync
    dispatch(addToCartAsync(payload));

    return { success: true };
  };

  /* ======================
     UPDATE QUANTITY
  ====================== */

  const updateQuantity = (id, quantity) => {
    // Find the menuItemId from cart state
    const cartItem = items.find((item) => item.id === id);
    if (!cartItem) return;

    dispatch(updateItemQuantityLocal({ id, quantity }));
    dispatch(updateCartItemAsync({ id: cartItem.menuItemId, quantity }));
  };

  /* ======================
     REMOVE ITEM
  ====================== */

  const removeItem = (id) => {
    // Find the menuItemId from cart state
    const cartItem = items.find((item) => item.id === id);
    if (!cartItem) return;

    dispatch(removeFromCartLocal(id));
    dispatch(removeFromCartAsync(cartItem.menuItemId));
  };

  /* ======================
     CLEAR CART
  ====================== */

  const clearCart = () => {
    dispatch(clearCartLocal());
    dispatch(clearCartAsync());
  };

  /* ======================
     CLEAR AND ADD FROM NEW RESTAURANT
  ====================== */

  const clearCartAndAddItem = (item) => {
    console.log("🔄 Clearing cart and adding item from new restaurant:", item);

    // 🔹 FRONTEND NORMALIZATION
    const payload = {
      id: item.id, // frontend id (for cart state)
      menuItemId: item._id, // backend MongoDB ObjectId
      name: item.name,
      image: item.image,
      category: item.category,
      price: item.price,
      quantity: 1,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
    };

    // Clear old cart and add new item atomically
    dispatch(clearCartAndAddItemLocal(payload));

    // Clear backend cart first, then add new item
    dispatch(clearCartAsync()).then(() => {
      dispatch(addToCartAsync(payload));
    });

    return { success: true };
  };

  return {
    // State
    items,
    totalPrice,
    totalQuantity,
    restaurantId,
    restaurantName,
    image,
    loading,
    error,

    // Actions
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    clearCartAndAddItem,
    clearError: () => dispatch(clearError()),
    fetchCart: () => dispatch(fetchCartFromServer()),
  };
};
