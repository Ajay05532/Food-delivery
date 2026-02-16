import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    name: { type: String, required: true },

    description: String,

    price: { type: Number, required: true },

    image: String,

    category: {
      type: String,
      index: true,
    },

    isVeg: { type: Boolean, default: true },

    isAvailable: { type: Boolean, default: true },

    // Optional fields for enhanced display
    originalPrice: Number,
    discount: String,
    rating: Number,
    ratingCount: Number,
    badge: String,
  },
  { timestamps: true },
);

const MenuItem =
  mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
