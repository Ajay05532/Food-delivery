const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get user's cart from backend
export const getCart = async () => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "GET",
    credentials: "include", // Include cookies for authentication
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No cart found, return empty cart
      return null;
    }
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch cart");
  }

  return await response.json();
};

// Add item to cart
export const addToCartAPI = async (cartData) => {
  const { id, name, image, category, price, quantity, restaurantId } = cartData;

  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      menuItemId: id, // Backend expects menuItemId
      name,
      image,
      category,
      price,
      quantity,
      restaurantId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add item to cart");
  }

  return await response.json();
};

// Update cart item quantity
export const updateCartItemAPI = async (menuItemId, quantity) => {
  const response = await fetch(`${API_BASE_URL}/items/${menuItemId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update cart item");
  }

  return await response.json();
};

// Remove item from cart
export const removeFromCartAPI = async (menuItemId) => {
  const response = await fetch(`${API_BASE_URL}/items/${menuItemId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to remove item from cart");
  }

  return await response.json();
};

// Clear entire cart
export const clearCartAPI = async () => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to clear cart");
  }

  return await response.json();
};

// Transform backend cart data to frontend format
export const transformBackendCart = (backendCart) => {
  if (!backendCart) return null;

  return {
    items: backendCart.items.map((item) => ({
      id: item.menuItemId.toString(), // Frontend uses id instead of menuItemId
      name: item.name,
      image: item.image,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
    restaurantId: backendCart.restaurant.toString(),
    // restaurantName will need to be fetched or stored separately
  };
};
