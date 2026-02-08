import express from "express";
import {register, login, logout, getMe} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Debug middleware - logs incoming requests
// router.use((req, res, next) => {
//   console.log("🔍 Auth Route Hit");
//   console.log("📋 Method:", req.method);
//   console.log("📋 Path:", req.path);
//   console.log("📋 Headers:", req.headers);
//   console.log("📋 req.body:", req.body);
//   next();
// });

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;
