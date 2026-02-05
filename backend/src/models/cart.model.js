import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },    
  items: [
    {
      name: String,
      image: String,
      category: String,
      price: Number,
      quantity: Number,
    },
  ],
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;