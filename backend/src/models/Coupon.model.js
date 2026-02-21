import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    restaurant: {
      type: Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    /* ── Discount ───────────────────────── */
    discountType: {
      type: String,
      enum: ["PERCENTAGE", "FLAT"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    // Only used when discountType === "PERCENTAGE"
    maxDiscount: {
      type: Number,
      default: null, // null = no cap
    },

    // Minimum cart total required to use this coupon
    minOrderAmount: {
      type: Number,
      default: 0,
    },

    /* ── Usage limits ───────────────────── */
    usageLimit: {
      type: Number,
      default: null, // null = unlimited
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    // Per-user usage limit (1 = single use per user)
    perUserLimit: {
      type: Number,
      default: 1,
    },

    usedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],

    /* ── Validity ───────────────────────── */
    expiresAt: {
      type: Date,
      default: null, // null = never expires
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export default Coupon;
