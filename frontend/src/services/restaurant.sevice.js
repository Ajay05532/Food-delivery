import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

// Add parameters for page and limit
export const getRestaurants = async (page = 1, limit = 20) => {
  try {
    // Pass the page and limit as query parameters
    const response = await axios.get(`${API_BASE_URL}/restaurants`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/restaurants/${restaurantId}`,
    );
    return response.data.data; // Return the restaurant object from data.data
  } catch (error) {
    throw error;
  }
};

export const getMenu = async (restaurantId) => {
  try {
    const menuItem = await axios.get(`${API_BASE_URL}/menu/${restaurantId}`);
    return menuItem.data;
  } catch (error) {
    throw error;
  }
};
