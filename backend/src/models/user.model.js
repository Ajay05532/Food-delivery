import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["user", "admin", "restaurant"],
      default: "user"
    }
  },
  { timestamps: true }
);


export default mongoose.model("User", userSchema);
