import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PaymentOption = ({
  icon,
  title,
  subtitle,
  selected,
  onSelect,
  recommended = false,
  children,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
        ${
          selected
            ? "bg-white dark:bg-gray-800 border-orange-500 shadow-md shadow-orange-500/10"
            : "bg-white dark:bg-gray-900 border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-sm"
        }
      `}
    >
      {selected && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-bl-[100px] pointer-events-none" />
      )}

      <div className="flex items-start gap-4 relative z-10">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 
          ${selected ? "bg-orange-50 dark:bg-orange-500/10" : "bg-gray-50 dark:bg-gray-800"}`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3
                className={`font-bold text-base transition-colors ${selected ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
              >
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate pr-2">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Radio / Check */}
            <div
              className={`shrink-0 transition-colors duration-300 ${selected ? "text-orange-500" : "text-gray-300 dark:text-gray-600"}`}
            >
              {selected ? (
                <CheckCircle2 className="w-6 h-6 fill-orange-50 dark:fill-orange-500/20" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
          </div>

          {/* Expanded children */}
          <AnimatePresence>
            {selected && children && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800/60">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {recommended && (
        <div className="absolute top-0 left-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] uppercase tracking-wider px-3 py-1 font-bold shadow-sm rounded-b-lg">
          Best Offer
        </div>
      )}
    </div>
  );
};

export default PaymentOption;
