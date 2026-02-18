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
      className={`
        relative p-4 rounded-xl border-2 transition-all cursor-pointer bg-white dark:bg-gray-800
        ${
          selected
            ? "border-emerald-500 shadow-sm"
            : "border-slate-100 hover:border-slate-200 dark:border-gray-700 dark:hover:border-gray-600"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Icon/Logo */}
        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center shrink-0">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-gray-100">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Selection Indicator */}
            <div
              className={`
              transition-colors duration-200
              ${selected ? "text-emerald-500" : "text-slate-300 dark:text-gray-600"}
            `}
            >
              {selected ? (
                <CheckCircle2 className="w-6 h-6 fill-emerald-50 dark:fill-emerald-900" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
          </div>

          {/* Expanded Content (Pay Button etc) */}
          <AnimatePresence>
            {selected && children && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {recommended && (
        <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded font-medium shadow-sm">
          Recommended
        </div>
      )}
    </div>
  );
};

export default PaymentOption;
