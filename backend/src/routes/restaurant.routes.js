import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Order Routes Working");
});

const OrderRoutes = router;
export default OrderRoutes;