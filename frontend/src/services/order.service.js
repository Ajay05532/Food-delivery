import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData, {
    withCredentials: true,
    ...getAuthHeaders(),
  });
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
    ...getAuthHeaders(),
  });
  return response.data;
};
