import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= CART API =================

// Get user's cart
export const getCart = async () => {
  try {
    const response = await apiClient.get("/checkout");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(error.response?.data?.message || "Failed to fetch cart");
  }
};

// Add item to cart
export const addToCartAPI = async (cartData) => {
  const { menuItemId, name, image, category, price, quantity, restaurantId } =
    cartData;

  try {
    const response = await apiClient.post("/checkout/items", {
      menuItemId,
      name,
      image,
      category,
      price,
      quantity,
      restaurantId,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add item to cart",
    );
  }
};

// Update quantity
export const updateCartItemAPI = async (menuItemId, quantity) => {
  try {
    const response = await apiClient.put(`/checkout/items/${menuItemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update item quantity",
    );
  }
};

// Remove item
export const removeFromCartAPI = async (menuItemId) => {
  try {
    const response = await apiClient.delete(`/checkout/items/${menuItemId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove item from cart",
    );
  }
};

// Clear cart
export const clearCartAPI = async () => {
  try {
    const response = await apiClient.delete("/checkout");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to clear cart");
  }
};

// Transform backend cart data to frontend format
export const transformBackendCart = (backendCart) => {
  if (!backendCart || !backendCart.items) return null;

  return {
    items: backendCart.items.map((item) => ({
      id: item.menuItemId.toString(),
      menuItemId: item.menuItemId, // Keep menuItemId for backend sync
      name: item.name,
      image: item.image,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
    restaurantId: backendCart.restaurant?._id?.toString(),
    restaurantName: backendCart.restaurant?.name,
    image: backendCart.restaurant?.image,
  };
};
