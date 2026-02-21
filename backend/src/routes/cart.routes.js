import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import authMiddleware, {
  optionalAuthMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Get Cart (Optional Auth - returns empty if not logged in)
router.get("/", optionalAuthMiddleware, getCart);

// Strictly Protected Routes
router.use(authMiddleware);
router.delete("/", clearCart);

// Cart Items
router.post("/items", addToCart);
router.put("/items/:menuItemId", updateCartItem);
router.delete("/items/:menuItemId", removeFromCart);

export default router;
