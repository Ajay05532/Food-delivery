import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    description: String,

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    coverImage: { type: String, required: true },

    gallery: { type: [String], default: [] },

    isOpen: { type: Boolean, default: true },

    minDeliveryTime: Number,
    maxDeliveryTime: Number,

    avgRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true },
);

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
