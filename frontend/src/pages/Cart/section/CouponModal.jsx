import React, { useState } from "react";
import { X, Copy, Check } from "lucide-react";

const CouponModal = ({ isOpen, onClose, onApplyCoupon, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const coupons = [
    {
      id: 1,
      code: "PARTY",
      title: "PARTY",
      description: "Get FLAT 15% off",
      details:
        "Use Code PARTY and get FLAT 15% off on order above Rs.1500. No Upper Limit.",
      minOrder: 1500,
      discount: "15%",
      icon: "🎉",
    },
    {
      id: 2,
      code: "CELEBRATIONS",
      title: "CELEBRATIONS",
      description: "Get Flat Rs.200 off",
      details: "Use code CELEBRATION & get ₹200 off on orders above ₹969",
      minOrder: 969,
      discount: "₹200",
      icon: "🎊",
    },
    {
      id: 3,
      code: "STUDENTDEAL",
      title: "STUDENTDEAL",
      description: "Get Flat Rs. 150 off",
      details: "Use code STUDENTDEAL & get flat ₹150 off orders above ₹649",
      minOrder: 649,
      discount: "₹150",
      icon: "🎓",
    },
    {
      id: 4,
      code: "SWIGGY50",
      title: "SWIGGY50",
      description: "Flat 50% off",
      details: "Use code SWIGGY50 & get 50% off on orders above ₹199",
      minOrder: 199,
      discount: "50%",
      icon: "⚡",
    },
    {
      id: 5,
      code: "FOODFEST",
      title: "FOODFEST",
      description: "Get ₹100 off",
      details: "Use code FOODFEST & get ₹100 off on all orders",
      minOrder: 0,
      discount: "₹100",
      icon: "🍔",
    },
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyCoupon = (coupon) => {
    onApplyCoupon(coupon);
    setCouponCode("");
    onClose();
  };

  const handleManualApply = () => {
    const found = coupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase(),
    );
    if (found) {
      handleApplyCoupon(found);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Right Drawer */}
      <div
        className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 z-[110] shadow-2xl w-full max-w-md overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          animation: "slideInRight 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Apply Coupon
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Manual Coupon Entry */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Enter coupon code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={handleManualApply}
                className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
              >
                APPLY
              </button>
            </div>
          </div>

          {/* Available Coupons */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
              AVAILABLE COUPONS
            </h3>
            <div className="space-y-3">
              {coupons.map((coupon) => {
                const isApplied = appliedCoupon?.code === coupon.code;

                return (
                  <div
                    key={coupon.id}
                    className={`border-2 rounded-lg p-4 transition-all ${
                      isApplied
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500/50 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{coupon.icon}</span>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {coupon.title}
                          </p>
                          <p className="text-sm text-orange-600 dark:text-orange-500 font-semibold">
                            {coupon.description}
                          </p>
                        </div>
                      </div>
                      {isApplied && (
                        <div className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded text-xs font-bold">
                          <Check size={14} />
                          Applied
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      {coupon.details}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {coupon.minOrder > 0 ? (
                          <>Min order: ₹{coupon.minOrder}</>
                        ) : (
                          <>No minimum order</>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          handleCopyCode(coupon.code);
                          if (!isApplied) {
                            handleApplyCoupon(coupon);
                          }
                        }}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                          isApplied
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-default"
                            : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50"
                        }`}
                      >
                        {copiedId === coupon.code ? (
                          <>
                            <Check size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            {isApplied ? "Applied" : "Apply"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-4">
            <p className="text-xs text-blue-800 dark:text-blue-300">
              💡 <strong>Tip:</strong> You can apply only one coupon per order.
              Choose the one that gives you the maximum savings!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponModal;
