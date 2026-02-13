import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Add parameters for page and limit
export const getRestaurants = async (page = 1, limit = 20) => {
  try {
    // Pass the page and limit as query parameters
    const response = await axios.get(`${API_BASE_URL}/restaurants`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};