import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import connectDB from "./src/config/mongo.config.js";
import authMiddleware from "./src/middleware/auth.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";


/* Connect to Database */
dotenv.config();
connectDB();

/* Enable CORS */
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

/* Health Check */
app.get("/", (req, res) => {
  res.send("Food Delivery Backend Running");
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ CORS enabled for http://localhost:5173`);
});
