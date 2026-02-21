import express from "express";
import { createPayment, verifyPayment } from "../controllers/payment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-payment",authMiddleware,createPayment)

router.post("/verify-payment",authMiddleware,verifyPayment)

export default router;