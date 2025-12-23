import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import itemRoutes from "./routes/item.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

/* Health Check */
app.get("/", (req, res) => {
  res.send("Food Delivery Backend Running");
});

export default app;
