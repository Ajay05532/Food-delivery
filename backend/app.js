import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import connectDB from "./src/config/mongo.config.js";
import cors from "cors";

/* Connect to Database */
dotenv.config();
connectDB();

/* Enable CORS */
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));




/* Middleware */
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.use("/api/orders", orderRoutes);

/* Health Check */
app.get("/", (req, res) => {
  res.send("Food Delivery Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
