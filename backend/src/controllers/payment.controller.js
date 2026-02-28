import Razorpay from "razorpay";
import Payment from "../models/payments.model.js";
import Order from "../models/Order.model.js";
import Cart from "../models/cart.model.js";
import crypto from "crypto";

// Lazily created so dotenv is guaranteed to have loaded first
let razorpayInstance = null;
const getRazorpay = () => {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
};

/**
 * POST /api/payment/create-payment
 * Body: { amount (in ₹), orderId (food order _id) }
 * Creates a Razorpay order and a Payment record in DB.
 */
export const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "amount is required" });
    }

    const razorpayOrder = await getRazorpay().orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`.slice(0, 40),
    });

    const payment = await Payment.create({
      userId: req.user._id,
      amount,
      razorpayOrderId: razorpayOrder.id,
      status: "created",
    });

    res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount, // in paise
      currency: razorpayOrder.currency,
      paymentId: payment._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create payment order" });
  }
};

/**
 * POST /api/payment/verify-payment
 * Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature, foodOrderId }
 * Verifies HMAC signature, marks Payment + Order as paid.
 */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      foodOrderId,
    } = req.body;

    // 1. Find matching payment record
    const payment = await Payment.findOne({ razorpayOrderId });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment record not found" });
    }

    // 2. Verify Razorpay signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpaySignature) {
      payment.status = "failed";
      await payment.save();
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    // 3. Update Payment record
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.status = "paid";
    if (foodOrderId) {
      payment.orderId = foodOrderId;
    }
    await payment.save();

    // 4. Update the food Order's paymentStatus → SUCCESS
    if (foodOrderId) {
      await Order.findByIdAndUpdate(foodOrderId, {
        paymentStatus: "SUCCESS",
        paymentMethod: "UPI",
      });
    }

    // 5. Now that payment is confirmed — clear the user's cart from DB
    await Cart.findOneAndDelete({ user: payment.userId });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      paymentId: payment._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to verify payment" });
  }
};
