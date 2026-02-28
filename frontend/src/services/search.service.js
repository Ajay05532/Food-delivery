import axios from "axios";
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const searchService = {
  async search(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
