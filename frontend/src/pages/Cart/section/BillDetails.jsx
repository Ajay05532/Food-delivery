import React from "react";
import { ChevronDown, Info } from "lucide-react";

const BillDetails = ({ items, appliedCoupon }) => {
  const itemTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 0; // Free delivery
  const gstAndCharges = Math.round(itemTotal * 0.05); // 5% GST

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount.includes("%")) {
      const percentage = parseInt(appliedCoupon.discount);
      discount = Math.round(itemTotal * (percentage / 100));
    } else {
      discount = parseInt(appliedCoupon.discount);
    }
  }

  const totalAmount = itemTotal + deliveryFee + gstAndCharges - discount;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4 transition-colors duration-300">
      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">Item Total</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ₹{itemTotal}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {items.reduce((sum, item) => sum + item.quantity, 0)} items
        </p>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Delivery Fee */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">
            Delivery Fee for 1.3 kms
          </span>
          <Info
            size={14}
            className="text-gray-400 dark:text-gray-500 cursor-help"
          />
        </div>
        <span className="font-semibold text-green-600 dark:text-green-400">
          FREE
        </span>
      </div>

      {/* GST and Charges */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">
            GST & Other Charges
          </span>
          <Info
            size={14}
            className="text-gray-400 dark:text-gray-500 cursor-help"
          />
        </div>
        <span className="font-semibold text-gray-900 dark:text-white">
          ₹{gstAndCharges}
        </span>
      </div>

      {/* Coupon Discount */}
      {appliedCoupon && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex items-center justify-between text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded">
            <div className="flex items-center gap-2">
              <span className="text-green-700 dark:text-green-400 font-semibold">
                {appliedCoupon.code}
              </span>
              <span className="text-green-600 dark:text-green-500 text-xs">
                Coupon applied
              </span>
            </div>
            <span className="font-bold text-green-600 dark:text-green-400">
              -₹{discount}
            </span>
          </div>
        </>
      )}

      {/* Divider */}
      <hr className="border-gray-300 dark:border-gray-600 border-dashed" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900 dark:text-white">TO PAY</span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ₹{totalAmount}
        </span>
      </div>

      {/* Breakdown */}
      <details className="text-xs text-gray-600 dark:text-gray-400">
        <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-2">
          Bill Details
          <ChevronDown size={16} />
        </summary>
        <div className="space-y-2 mt-3 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Item Total:</span>
            <span>₹{itemTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span className="text-green-600 dark:text-green-400">FREE</span>
          </div>
          <div className="flex justify-between">
            <span>GST & Charges:</span>
            <span>₹{gstAndCharges}</span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Discount ({appliedCoupon.code}):</span>
              <span>-₹{discount}</span>
            </div>
          )}
        </div>
      </details>
    </div>
  );
};

export default BillDetails;
