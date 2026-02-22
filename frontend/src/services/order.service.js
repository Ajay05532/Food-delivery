import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders`, orderData, {
    withCredentials: true,
  });
  return response.data;
};

export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      withCredentials: true,
    });
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
