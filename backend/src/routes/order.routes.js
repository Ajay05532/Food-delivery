import express from "express";
import { createOrder, getUserOrders } from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // All order routes differ protected

router.post("/", createOrder);
router.get("/", getUserOrders);

export default router;
