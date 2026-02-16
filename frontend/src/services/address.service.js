import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addressService = {
  async getAddresses() {
    try {
      const response = await apiClient.get("/address");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },

  async getAddress(addressId) {
    try {
      const response = await apiClient.get(`/address/${addressId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch address",
      );
    }
  },

  async addAddress(address) {
    try {
      const response = await apiClient.post("/address", address);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add address");
    }
  },

  async updateAddress(address) {
    try {
      const response = await apiClient.put(`/address/${address._id}`, address);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update address",
      );
    }
  },

  async deleteAddress(addressId) {
    try {
      const response = await apiClient.delete(`/address/${addressId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete address",
      );
    }
  },
};
