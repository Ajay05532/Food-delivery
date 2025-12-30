import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: Number,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
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
