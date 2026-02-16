import mongoose from "mongoose";
import { userAddressSchema } from "./userAddress.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "restaurant"],
      default: "user",
    },
    addresses: {
      type: [userAddressSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
