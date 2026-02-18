import React from "react";
import { MapPin, Clock } from "lucide-react";

const OrderSummary = ({ restaurant, items, total, savings, address }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 p-6 mb-6">
      {/* Restaurant Header */}
      <div className="flex items-start justify-between pb-6 border-b border-slate-100 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {restaurant?.name || "Restaurant Name"}
          </h2>
          <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm mt-1">
            <Clock className="w-4 h-4" />
            <span>Delivery in: 30-40 mins</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-slate-500 dark:text-gray-400 text-sm">
            {items?.length || 0} items
          </p>
          <p className="font-bold text-slate-800 dark:text-white">₹{total}</p>
          {savings > 0 && (
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              Savings: ₹{savings}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="pt-4 flex gap-3">
        <MapPin className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-slate-700 dark:text-gray-200">
            Delivery to Home
          </p>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed mt-0.5">
            {address || "Please select an address"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
