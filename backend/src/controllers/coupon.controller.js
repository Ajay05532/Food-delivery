import Coupon from "../models/Coupon.model.js";

/* ─────────────────────────────────────────────────────────────
   POST /api/coupons
   Body: { code, restaurant, discountType, discountValue, maxDiscount?,
           minOrderAmount?, usageLimit?, perUserLimit?, expiresAt?,
           description? }
   Create a coupon for a restaurant.
───────────────────────────────────────────────────────────── */
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      restaurant,
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      usageLimit,
      perUserLimit,
      expiresAt,
      description,
    } = req.body;

    if (!code || !restaurant || !discountType || discountValue == null) {
      return res.status(400).json({
        success: false,
        message:
          "code, restaurant, discountType, and discountValue are required",
      });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase().trim(),
      restaurant,
      discountType,
      discountValue,
      maxDiscount: maxDiscount ?? null,
      minOrderAmount: minOrderAmount ?? 0,
      usageLimit: usageLimit ?? null,
      perUserLimit: perUserLimit ?? 1,
      expiresAt: expiresAt ?? null,
      description: description ?? "",
    });

    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Coupon code "${req.body.code?.toUpperCase()}" already exists`,
      });
    }
    console.error("createCoupon Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create coupon" });
  }
};

/* ─────────────────────────────────────────────────────────────
   GET /api/coupons/restaurant/:restaurantId
   Get all coupons for a specific restaurant.
───────────────────────────────────────────────────────────── */
export const getCouponsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const coupons = await Coupon.find({ restaurant: restaurantId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    console.error("getCouponsByRestaurant Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch coupons" });
  }
};

/* ─────────────────────────────────────────────────────────────
   POST /api/coupons/apply
   Body: { code, restaurantId, orderAmount }
   Validate a coupon and return the discounted amount.
   Does NOT mark as used — that happens when order is placed.
───────────────────────────────────────────────────────────── */
export const applyCoupon = async (req, res) => {
  try {
    const userId = req.user._id;
    const { code, restaurantId, orderAmount } = req.body;

    if (!code || !restaurantId || orderAmount == null) {
      return res.status(400).json({
        success: false,
        message: "code, restaurantId, and orderAmount are required",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase().trim(),
      restaurant: restaurantId,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid coupon code" });
    }

    // ── Validations ──────────────────────────────────────────
    if (!coupon.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "This coupon is no longer active" });
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return res
        .status(400)
        .json({ success: false, message: "This coupon has expired" });
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This coupon has reached its usage limit",
        });
    }

    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.minOrderAmount} required`,
      });
    }

    // Per-user limit check
    const userUsageCount = coupon.usedBy.filter(
      (id) => id.toString() === userId.toString(),
    ).length;
    if (coupon.perUserLimit !== null && userUsageCount >= coupon.perUserLimit) {
      return res.status(400).json({
        success: false,
        message: "You have already used this coupon",
      });
    }

    // ── Calculate discount ───────────────────────────────────
    let discountAmount = 0;
    if (coupon.discountType === "PERCENTAGE") {
      discountAmount = (orderAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscount !== null) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else {
      // FLAT
      discountAmount = coupon.discountValue;
    }
    discountAmount = Math.min(discountAmount, orderAmount); // can't exceed order amount
    const finalAmount = orderAmount - discountAmount;

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: {
        couponId: coupon._id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: Math.round(discountAmount * 100) / 100,
        originalAmount: orderAmount,
        finalAmount: Math.round(finalAmount * 100) / 100,
        description: coupon.description,
      },
    });
  } catch (error) {
    console.error("applyCoupon Error:", error);
    res.status(500).json({ success: false, message: "Failed to apply coupon" });
  }
};

/* ─────────────────────────────────────────────────────────────
   PATCH /api/coupons/:id/use
   Called internally after a successful order to mark coupon used.
───────────────────────────────────────────────────────────── */
export const markCouponUsed = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    coupon.usedCount += 1;
    coupon.usedBy.push(userId);
    await coupon.save();

    res.status(200).json({ success: true, message: "Coupon marked as used" });
  } catch (error) {
    console.error("markCouponUsed Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to mark coupon as used" });
  }
};

/* ─────────────────────────────────────────────────────────────
   PATCH /api/coupons/:id
   Update a coupon (toggle active, change value, etc.)
───────────────────────────────────────────────────────────── */
export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = [
      "description",
      "discountValue",
      "maxDiscount",
      "minOrderAmount",
      "usageLimit",
      "perUserLimit",
      "expiresAt",
      "isActive",
    ];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const coupon = await Coupon.findByIdAndUpdate(id, updates, { new: true });
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.error("updateCoupon Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update coupon" });
  }
};

/* ─────────────────────────────────────────────────────────────
   DELETE /api/coupons/:id
───────────────────────────────────────────────────────────── */
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    res.status(200).json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    console.error("deleteCoupon Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete coupon" });
  }
};
