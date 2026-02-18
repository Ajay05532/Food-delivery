import mongoose, { ObjectId } from "mongoose";

export const orderSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "User", required: true },

  restaurant: {
    type: ObjectId,
    ref: "Restaurant",
    required: true
  },

  items: [
    {menuId: {type: ObjectId, ref: "Menu", required: true},}
  ],

  pricing: {
    subtotal: Number,
    deliveryFee: Number,
    tax: Number,
    discount: Number,
    grandTotal: Number
  },

  deliveryAddress: {
    label: String,
    street: String,
    area: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },

  status: {
    type: String,
    enum: [
      "PLACED",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED"
    ],
    default: "PLACED"
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
    default: "PENDING"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
