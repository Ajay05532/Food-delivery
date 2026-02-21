import React from "react";
import { Plus, Minus, X, Info, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BillDetails = ({ items, appliedCoupon }) => {
  const itemTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 0; // Free delivery initially
  const gstAndCharges = Math.round(itemTotal * 0.05); // 5% GST
  const discount = appliedCoupon?.discountAmount ?? 0;
  const totalAmount = itemTotal + deliveryFee + gstAndCharges - discount;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col gap-4">
      {/* Items Total */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-900 dark:text-white font-bold opacity-90">
            Item Total
          </p>
          <p className="text-xs text-gray-500">
            {items.reduce((sum, i) => sum + i.quantity, 0)} items
          </p>
        </div>
        <span className="font-extrabold text-gray-900 dark:text-white text-lg">
          ₹{itemTotal}
        </span>
      </div>

      <hr className="border-gray-100 dark:border-gray-800" />

      {/* Delivery */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-medium">
          Delivery Fee (1.3 km)
          <Info className="w-4 h-4 text-gray-400 group-hover:text-orange-500 cursor-help transition-colors" />
        </div>
        <span className="font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
          FREE
        </span>
      </div>

      {/* GST / Charges */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-medium">
          Taxes & Charges
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
        </div>
        <span className="font-bold text-gray-900 dark:text-white">
          ₹{gstAndCharges}
        </span>
      </div>

      {/* Coupon Discount */}
      <AnimatePresence>
        {appliedCoupon && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <hr className="border-gray-100 dark:border-gray-800 my-4" />
            <div className="flex items-center justify-between text-sm bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 p-3 rounded-xl shadow-sm">
              <div className="flex flex-col">
                <span className="text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center gap-1.5">
                  🎟️ {appliedCoupon.code}
                </span>
                <span className="text-emerald-600/80 dark:text-emerald-500 text-[11px] font-semibold mt-0.5">
                  Coupon Savings Applied!
                </span>
              </div>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                -₹{discount}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <hr className="border-gray-300 dark:border-gray-700 border-dashed my-2" />

      {/* Final Total */}
      <div className="flex flex-col">
        <div className="flex items-end justify-between">
          <span className="font-extrabold text-gray-900 dark:text-white text-lg tracking-tight">
            TO PAY
          </span>
          <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            ₹{totalAmount}
          </span>
        </div>
        <p className="text-xs text-end text-gray-500 dark:text-gray-400 mt-1 font-medium">
          Incl. of all taxes
        </p>
      </div>

      {/* Expandable Breakdown Details */}
      <details className="text-sm mt-2 group outline-none">
        <summary className="cursor-pointer font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-xl transition-colors select-none list-none outline-none">
          View Detailed Breakdown
          <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform duration-300" />
        </summary>
        <div className="space-y-2.5 mt-4 px-2 text-gray-600 dark:text-gray-400 font-medium pb-2">
          <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
            <span>Item Total:</span>
            <span className="text-gray-900 dark:text-white font-bold">
              ₹{itemTotal}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
            <span>Delivery Fee:</span>
            <span className="text-emerald-500 font-bold">FREE</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
            <span>GST (5%) & Platform Fee:</span>
            <span className="text-gray-900 dark:text-white font-bold">
              ₹{gstAndCharges}
            </span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-extrabold">
              <span>{appliedCoupon.code} Discount:</span>
              <span>-₹{discount}</span>
            </div>
          )}
        </div>
      </details>
    </div>
  );
};

export default BillDetails;
