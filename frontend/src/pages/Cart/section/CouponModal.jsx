import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  Ticket,
  Loader2,
  AlertCircle,
  Tag,
} from "lucide-react";
import {
  getCouponsForRestaurant,
  applyCouponCode,
} from "../../../services/coupon.service";

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
  const [applying, setApplying] = useState(null); // coupon code being applied
  const [error, setError] = useState("");

  /* ── Fetch real coupons from backend ──────────────── */
  useEffect(() => {
    if (!isOpen || !restaurantId) return;
    setLoading(true);
    setError("");
    getCouponsForRestaurant(restaurantId)
      .then((res) => setCoupons(res.data || []))
      .catch(() => setError("Failed to load coupons"))
      .finally(() => setLoading(false));
  }, [isOpen, restaurantId]);

  /* ── Apply a coupon by calling the backend ──────── */
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
        onApplyCoupon(res.data); // pass { couponId, code, discountAmount, finalAmount, ... }
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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[100]" onClick={onClose} />

      {/* Right Drawer */}
      <div
        className="fixed right-0 top-0 h-full bg-white dark:bg-gray-800 z-[110] shadow-2xl w-full max-w-md overflow-y-auto"
        style={{ animation: "slideInRight 0.25s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center gap-2">
            <Ticket className="text-orange-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Apply Coupon
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={22} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Applied coupon banner */}
          {appliedCoupon && (
            <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-400 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="w-4 h-4" />
                <span className="font-bold text-sm">{appliedCoupon.code}</span>
                <span className="text-sm">
                  — saving ₹{appliedCoupon.discountAmount}
                </span>
              </div>
              <button
                onClick={handleRemove}
                className="text-xs font-bold text-red-500 hover:text-red-600"
              >
                REMOVE
              </button>
            </div>
          )}

          {/* Manual code input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Enter coupon code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => {
                  setManualCode(e.target.value.toUpperCase());
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && applyCode(manualCode)}
                placeholder="e.g. SAVE50"
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm"
              />
              <button
                onClick={() => applyCode(manualCode)}
                disabled={!manualCode.trim() || !!applying}
                className="px-5 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-60 transition-colors text-sm flex items-center gap-1.5"
              >
                {applying === manualCode ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                APPLY
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-800 px-3 text-xs text-gray-400 font-semibold uppercase tracking-widest">
                Available Coupons
              </span>
            </div>
          </div>

          {/* Coupon list */}
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Tag className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                No coupons available for this restaurant
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {coupons
                .filter((c) => c.isActive)
                .map((coupon) => {
                  const isApplied = appliedCoupon?.code === coupon.code;
                  const isExpired =
                    coupon.expiresAt && new Date() > new Date(coupon.expiresAt);
                  const discountLabel =
                    coupon.discountType === "PERCENTAGE"
                      ? `${coupon.discountValue}% off${coupon.maxDiscount ? ` (max ₹${coupon.maxDiscount})` : ""}`
                      : `Flat ₹${coupon.discountValue} off`;

                  return (
                    <div
                      key={coupon._id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        isApplied
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : isExpired
                            ? "border-gray-200 bg-gray-50 dark:bg-gray-900 opacity-60"
                            : "border-gray-200 dark:border-gray-700 hover:border-orange-300 bg-white dark:bg-gray-800"
                      }`}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {EMOJI[coupon.discountType] || "🎟️"}
                          </span>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm tracking-wide">
                              {coupon.code}
                            </p>
                            <p className="text-orange-600 dark:text-orange-400 text-xs font-semibold">
                              {discountLabel}
                            </p>
                          </div>
                        </div>
                        {isApplied && (
                          <span className="flex items-center gap-1 bg-orange-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                            <Check size={12} /> Applied
                          </span>
                        )}
                        {isExpired && (
                          <span className="text-xs text-red-500 font-semibold">
                            Expired
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {coupon.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 pl-7">
                          {coupon.description}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pl-7">
                        <div className="text-xs text-gray-400 space-x-2">
                          {coupon.minOrderAmount > 0 && (
                            <span>Min: ₹{coupon.minOrderAmount}</span>
                          )}
                          {coupon.expiresAt && !isExpired && (
                            <span>
                              Expires:{" "}
                              {new Date(coupon.expiresAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                },
                              )}
                            </span>
                          )}
                          {coupon.usageLimit && (
                            <span>
                              {coupon.usageLimit - coupon.usedCount} uses left
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
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                              isApplied
                                ? "bg-red-50 text-red-500 hover:bg-red-100"
                                : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200"
                            }`}
                          >
                            {applying === coupon.code ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : isApplied ? (
                              "Remove"
                            ) : (
                              "Apply"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Tip */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              💡 <strong>Tip:</strong> Only one coupon can be applied per order.
              Coupons are linked to this restaurant only.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponModal;
