import express from "express";
import {
  createCoupon,
  getCouponsByRestaurant,
  applyCoupon,
  markCouponUsed,
  updateCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// All coupon routes require authentication
router.use(authMiddleware);

// ── Admin / Restaurant Owner routes ─────────────────────────
// Create a new coupon
router.post("/", createCoupon);

// Get all coupons for a restaurant
router.get("/restaurant/:restaurantId", getCouponsByRestaurant);

// Update a coupon (toggle active, change discount, etc.)
router.patch("/:id", updateCoupon);

// Delete a coupon
router.delete("/:id", deleteCoupon);

// ── User routes ─────────────────────────────────────────────
// Validate & calculate discount (used on checkout page)
router.post("/apply", applyCoupon);

// Mark coupon as used after successful order placement
router.patch("/:id/use", markCouponUsed);

export default router;
