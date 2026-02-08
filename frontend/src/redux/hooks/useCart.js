import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateItemQuantity,
  clearCart,
  clearCartAndAddItem,
  clearError,
  fetchCartFromServer,
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

  // Smart add to cart with restaurant check
  const addToCart = (item) => {
    const {
      id,
      restaurantId: itemRestaurantId,
      restaurantName: itemRestaurantName,
      image: itemImage,
      quantity = 1,
    } = item;

    // Check if item has restaurant info
    if (!itemRestaurantId) {
      console.warn("Item must include restaurantId and restaurantName");
      return;
    }

    // If cart has different restaurant, show error
    if (restaurantId && restaurantId !== itemRestaurantId) {
      dispatch(clearError());
      // Return error flag so component can show modal
      return {
        success: false,
        error: `You can only order from one restaurant at a time. Current: ${restaurantName}, Trying: ${itemRestaurantName}`,
        currentRestaurant: restaurantName,
        newRestaurant: itemRestaurantName,
      };
    }

    dispatch(
      addToCartAction({
        ...item,
        quantity,
      }),
    );

    return { success: true };
  };

  // Replace cart with new restaurant's items
  const switchRestaurant = (
    items,
    newRestaurantId,
    newRestaurantName,
    newImage,
  ) => {
    dispatch(
      replaceCart({
        items,
        restaurantId: newRestaurantId,
        restaurantName: newRestaurantName,
        image: newImage,
      }),
    );
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
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId)),
    increaseQuantity: (itemId) => dispatch(increaseQuantity(itemId)),
    decreaseQuantity: (itemId) => dispatch(decreaseQuantity(itemId)),
    updateItemQuantity: (id, quantity) =>
      dispatch(updateItemQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    clearCartAndAddItem: (item) => dispatch(clearCartAndAddItem(item)),
    clearError: () => dispatch(clearError()),
    fetchCart: () => dispatch(fetchCartFromServer()),
    switchRestaurant,
  };
};
