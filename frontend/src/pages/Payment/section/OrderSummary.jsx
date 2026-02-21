import React from "react";
import { MapPin, Clock, Utensils } from "lucide-react";

const OrderSummary = ({ restaurant, items, total, savings, address }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-bl-[100px] pointer-events-none" />

      {/* Header */}
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>

      {/* Restaurant */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-inner">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
              {restaurant?.name || "Restaurant Name"}
            </h3>
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
              <Clock className="w-4 h-4 text-orange-500" />
              Delivery in 30-40 mins
            </div>
          </div>
        </div>
      </div>

      {/* Financials & Address Row */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Address */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white mb-0.5">
              Delivery Home
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed truncate max-w-[200px]">
              {address || "Please select an address"}
            </p>
          </div>
        </div>

        {/* Right: Total */}
        <div className="flex flex-col md:items-end">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
            Total to Pay ({items?.length || 0} items)
          </p>
          <div className="flex items-end gap-3 md:justify-end">
            {savings > 0 && (
              <span className="text-sm font-bold text-gray-400 dark:text-gray-500 line-through mb-1">
                ₹{total + savings}
              </span>
            )}
            <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              ₹{total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
