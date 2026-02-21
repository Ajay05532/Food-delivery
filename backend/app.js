import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongo.config.js";
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

const app = express();

/* CORS */
app.use(
  cors({
    origin: "http://localhost:5173",
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

/* Health check */
app.get("/", (req, res) => {
  res.send("Food Delivery Backend Running");
});

/* Global error handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

/* Server */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
