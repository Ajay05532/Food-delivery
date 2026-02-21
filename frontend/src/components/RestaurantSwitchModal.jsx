import React from "react";
import { X, AlertTriangle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RestaurantSwitchModal = ({
  isOpen,
  onClose,
  onClearAndAdd,
  currentRestaurant = "Restaurant",
  newRestaurant = "Restaurant",
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-t-[2.5rem] md:rounded-b-[2.5rem] md:bottom-auto md:top-1/2 md:-translate-y-1/2 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-[9999] overflow-hidden border border-white/20 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Area */}
            <div className="px-6 md:px-8 pt-8 pb-6 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-500/5 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors group"
              >
                <X
                  size={20}
                  className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-500/20 dark:to-red-500/20 rounded-[2rem] flex items-center justify-center mb-5 shadow-inner border border-white/50 dark:border-white/5 relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-[2rem] blur-xl" />
                  <AlertTriangle className="text-orange-500 dark:text-orange-400 w-8 h-8 relative z-10" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                  Replace cart items?
                </h2>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-[280px] leading-relaxed">
                  Your cart currently contains items from another restaurant.
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-6 md:px-8 pt-2 pb-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-5 md:p-6 border border-gray-100 dark:border-gray-800/60 relative overflow-hidden">
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Discard
                    </span>
                    <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                      Add From
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-gray-400 dark:text-gray-500 truncate line-through">
                        {currentRestaurant}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0 z-10">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-base font-black text-gray-900 dark:text-white truncate">
                        {newRestaurant}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative background lines */}
                <div
                  className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Cg/%3E%3C/svg%3E\")",
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-extrabold text-sm hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white transition-all active:scale-95 uppercase tracking-wide"
                >
                  Cancel
                </button>
                <button
                  onClick={onClearAndAdd}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-extrabold text-sm rounded-2xl hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 uppercase tracking-wide"
                >
                  Yes, Start Afresh
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RestaurantSwitchModal;
