const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// ================= CART API =================

// Get user's cart
export const getCart = async () => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch cart");
  }

  return response.json();
};

// Add item to cart
export const addToCartAPI = async (cartData) => {
  const { menuItemId, name, image, category, price, quantity, restaurantId } =
    cartData;

  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      menuItemId,
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

  return response.json();
};

// Update quantity
export const updateCartItemAPI = async (menuItemId, quantity) => {
  const response = await fetch(`${API_BASE_URL}/items/${menuItemId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update cart item");
  }

  return response.json();
};

// Remove item
export const removeFromCartAPI = async (menuItemId) => {
  const response = await fetch(`${API_BASE_URL}/items/${menuItemId}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to remove item");
  }

  return response.json();
};

// Clear cart
export const clearCartAPI = async () => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to clear cart");
  }

  return response.json();
};

// Transform backend → frontend
export const transformBackendCart = (backendCart) => {
  if (!backendCart) return null;

  return {
    items: backendCart.items.map((item) => ({
      id: item.menuItemId.toString(),
      name: item.name,
      image: item.image,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
    restaurantId: backendCart.restaurant.toString(),
  };
};
