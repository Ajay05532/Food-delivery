import mongoose from "mongoose";

export const userAddressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    pincode: String,
    landmark: String,

    coordinates: {
      latitude: Number,
      longitude: Number,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true, timestamps: true },
);

