import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Step 1 — Call backend to create a Razorpay order.
 * Returns { razorpayOrderId, amount, currency, paymentId }
 */
export const createRazorpayOrder = async ({ amount, orderId }) => {
  const response = await axios.post(
    `${API_URL}/payment/create-payment`,
    { amount, orderId },
    { withCredentials: true },
  );
  return response.data;
};

/**
 * Step 2 — Tell backend to verify the Razorpay payment signature,
 * update the DB payment status, and mark the food order as paid.
 */
export const verifyRazorpayPayment = async ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  foodOrderId,
}) => {
  const response = await axios.post(
    `${API_URL}/payment/verify-payment`,
    { razorpayOrderId, razorpayPaymentId, razorpaySignature, foodOrderId },
    { withCredentials: true },
  );
  return response.data;
};

/**
 * Helper — dynamically load the Razorpay checkout script.
 * Returns true if loaded successfully.
 */
export const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
