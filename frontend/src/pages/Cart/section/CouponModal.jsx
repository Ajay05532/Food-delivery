import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  Ticket,
  Loader2,
  AlertCircle,
  Tag,
  Sparkles,
} from "lucide-react";
import {
  getCouponsForRestaurant,
  applyCouponCode,
} from "../../../services/coupon.service";
import { motion, AnimatePresence } from "framer-motion";

const EMOJI = { PERCENTAGE: "⚡", FLAT: "🎟️" };

const CouponModal = ({
  isOpen,
  onClose,
  onApplyCoupon,
  appliedCoupon,
  restaurantId,
  orderAmount,
}) => {
  const [manualCode, setManualCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !restaurantId) return;
    setLoading(true);
    setError("");
    getCouponsForRestaurant(restaurantId)
      .then((res) => setCoupons(res.data || []))
      .catch(() => setError("Failed to load coupons"))
      .finally(() => setLoading(false));
  }, [isOpen, restaurantId]);

  const applyCode = async (code) => {
    if (!code.trim()) return;
    setApplying(code);
    setError("");
    try {
      const res = await applyCouponCode({
        code: code.trim().toUpperCase(),
        restaurantId,
        orderAmount,
      });
      if (res.success) {
        onApplyCoupon(res.data);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired coupon");
    } finally {
      setApplying(null);
    }
  };

  const handleRemove = () => {
    onApplyCoupon(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Right Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl z-[110] shadow-2xl w-full max-w-md overflow-hidden border-l border-white/20 dark:border-gray-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800/60 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-500/5 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Ticket className="text-white w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Apply Coupon
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors active:scale-95"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Applied coupon banner */}
              <AnimatePresence>
                {appliedCoupon && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-extrabold block">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-emerald-50 text-xs font-medium">
                          Saving ₹{appliedCoupon.discountAmount}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleRemove}
                      className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      REMOVE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Manual code input */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/60">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
                  <Sparkles className="w-4 h-4 text-orange-500" /> Have a promo
                  code?
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => {
                      setManualCode(e.target.value.toUpperCase());
                      setError("");
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" && applyCode(manualCode)
                    }
                    placeholder="e.g. SAVE50"
                    className="w-full pl-4 pr-24 py-3.5 border-2 border-transparent focus:border-orange-500 rounded-xl focus:outline-none bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white placeholder-gray-400 font-bold uppercase transition-all"
                  />
                  <button
                    onClick={() => applyCode(manualCode)}
                    disabled={!manualCode.trim() || !!applying}
                    className="absolute right-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:hover:shadow-none transition-all text-xs flex items-center gap-1.5"
                  >
                    {applying === manualCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "APPLY"
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 mt-3 text-red-500 text-xs font-bold"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-gray-900 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest rounded-full">
                    Available Offers
                  </span>
                </div>
              </div>

              {/* Coupon list */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                </div>
              ) : coupons.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Tag className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    No offers available right now.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {coupons
                    .filter((c) => c.isActive)
                    .map((coupon, idx) => {
                      const isApplied = appliedCoupon?.code === coupon.code;
                      const isExpired =
                        coupon.expiresAt &&
                        new Date() > new Date(coupon.expiresAt);
                      const discountLabel =
                        coupon.discountType === "PERCENTAGE"
                          ? `${coupon.discountValue}% off${coupon.maxDiscount ? ` (max ₹${coupon.maxDiscount})` : ""}`
                          : `Flat ₹${coupon.discountValue} off`;

                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={coupon._id}
                          className={`relative overflow-hidden border-2 rounded-2xl transition-all duration-300 ${isApplied ? "border-orange-500 bg-orange-50/50 dark:bg-orange-500/10 shadow-md shadow-orange-500/10" : isExpired ? "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-60" : "border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"}`}
                        >
                          {isApplied && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full pointer-events-none" />
                          )}

                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${isApplied ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-orange-50 dark:bg-gray-700"}`}
                                >
                                  {EMOJI[coupon.discountType] || "🎟️"}
                                </div>
                                <div>
                                  <p className="font-black text-gray-900 dark:text-white text-base tracking-tight">
                                    {coupon.code}
                                  </p>
                                  <p className="text-orange-500 text-xs font-bold mt-0.5">
                                    {discountLabel}
                                  </p>
                                </div>
                              </div>
                              {isApplied && (
                                <span className="flex items-center gap-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                  <Check size={12} strokeWidth={3} /> Applied
                                </span>
                              )}
                              {isExpired && (
                                <span className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded-lg font-bold uppercase tracking-wider">
                                  Expired
                                </span>
                              )}
                            </div>

                            {coupon.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium leading-relaxed">
                                {coupon.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 relative">
                              {/* Decorative cutouts */}
                              <div className="absolute -left-6 -top-2 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700" />
                              <div className="absolute -right-6 -top-2 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700" />

                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-3 opacity-80">
                                {coupon.minOrderAmount > 0 && (
                                  <span>Min: ₹{coupon.minOrderAmount}</span>
                                )}
                                {coupon.expiresAt && !isExpired && (
                                  <span>
                                    Exp:{" "}
                                    {new Date(
                                      coupon.expiresAt,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                )}
                              </div>

                              {!isExpired && (
                                <button
                                  onClick={() =>
                                    isApplied
                                      ? handleRemove()
                                      : applyCode(coupon.code)
                                  }
                                  disabled={!!applying}
                                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isApplied ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20" : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-white text-white dark:text-gray-900"}`}
                                >
                                  {applying === coupon.code ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : isApplied ? (
                                    "Remove"
                                  ) : (
                                    "Apply"
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              )}

              {/* Tip */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-4 flex items-start gap-3 mt-8">
                <span className="text-blue-500 text-lg">💡</span>
                <p className="text-xs text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                  <strong>Pro Tip:</strong> Only one coupon can be applied per
                  order. Coupons shown here are specifically tailored for this
                  restaurant.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CouponModal;
