import express from "express";
import {addToCart, getCart, updateCartItem, removeFromCart, clearCart} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// Cart
router.get("/", getCart);
router.delete("/", clearCart);

// Cart Items
router.post("/items", addToCart);
router.put("/items/:menuItemId", updateCartItem);
router.delete("/items/:menuItemId", removeFromCart);


export default router;