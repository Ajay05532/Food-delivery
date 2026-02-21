import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartItems = ({
  items,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  restaurantName,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
      {/* Items List */}
      <div className="space-y-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, height: 0 }}
              className="flex flex-col sm:flex-row gap-4 sm:items-center pb-6 border-b border-gray-100 dark:border-gray-800/60 last:border-0 last:pb-0"
            >
              {/* Image & Type Indicator */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-gray-100 dark:bg-gray-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute top-2 left-2 w-4 h-4 rounded-sm bg-white border-2 flex items-center justify-center ${item.type === "veg" ? "border-green-600" : "border-red-600"}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${item.type === "veg" ? "bg-green-600" : "bg-red-600"}`}
                  />
                </div>
              </div>

              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                    {item.name}
                  </h4>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-400 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate max-w-xs">
                  {item.description || "Freshly prepared meal just for you."}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-gray-900 dark:text-white">
                      ₹{item.price * item.quantity}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-xs text-gray-500 font-medium tracking-wide">
                        ₹{item.price} each
                      </span>
                    )}
                  </div>

                  {/* Enhanced Quantity Controls */}
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <button
                      onClick={() => onDecreaseQuantity(item.id)}
                      className="p-2 sm:p-2.5 hover:bg-white dark:hover:bg-gray-700 hover:text-orange-500 transition-colors text-gray-600 dark:text-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-bold text-gray-900 dark:text-white select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncreaseQuantity(item.id)}
                      className="p-2 sm:p-2.5 hover:bg-white dark:hover:bg-gray-700 hover:text-orange-500 transition-colors text-gray-600 dark:text-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cooking Instructions (Styled) */}
      <div className="mt-6">
        <div className="relative group">
          <textarea
            placeholder="Any special requests? We'll pass them on..."
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 focus:bg-white dark:focus:bg-gray-800 outline-none resize-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
            rows="2"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
