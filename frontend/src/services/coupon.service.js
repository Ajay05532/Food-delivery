import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const api = axios.create({ baseURL: API_URL, withCredentials: true });

/**
 * Fetch all active coupons for a restaurant.
 * GET /api/coupons/restaurant/:restaurantId
 */
export const getCouponsForRestaurant = async (restaurantId) => {
  const res = await api.get(`/coupons/restaurant/${restaurantId}`);
  return res.data; // { success, data: Coupon[] }
};

/**
 * Validate a coupon code and calculate the discount.
 * POST /api/coupons/apply
 */
export const applyCouponCode = async ({ code, restaurantId, orderAmount }) => {
  const res = await api.post("/coupons/apply", {
    code,
    restaurantId,
    orderAmount,
  });
  return res.data; // { success, data: { couponId, code, discountAmount, finalAmount, ... } }
};

/**
 * Mark a coupon as used after a successful order.
 * PATCH /api/coupons/:id/use
 */
export const markCouponUsed = async (couponId) => {
  const res = await api.patch(`/coupons/${couponId}/use`);
  return res.data;
};
