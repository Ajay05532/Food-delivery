import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  verifyOtp,
} from "../controllers/auth.controller.js";
import authMiddleware, {
  optionalAuthMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/logout", logout);
router.get("/me", optionalAuthMiddleware, getMe);

export default router;
