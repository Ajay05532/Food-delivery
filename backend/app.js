import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongo.config.js";
import { connectRedis } from "./src/config/redis.js";
import authRoutes from "./src/routes/auth.routes.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import menuRoutes from "./src/routes/menu.routes.js";
import searchRoutes from "./src/routes/search.routes.js";
import userAddressRoutes from "./src/routes/userAddress.routes.js";
import paymentRoutes from "./src/routes/payment.route.js";
import couponRoutes from "./src/routes/coupon.routes.js";

connectDB();
connectRedis();

const app = express();

/* CORS */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

/* Core middleware */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/checkout", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/address", userAddressRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);

import { errorHandler } from "./src/middleware/error.middleware.js";
import AppError from "./src/utils/AppError.js";

/* Health check */
app.get("/", (req, res) => {
  res.send("Food Delivery Backend Running");
});

/* Catch undefined routes */
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/* Global error handler */
app.use(errorHandler);

/* Server */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
