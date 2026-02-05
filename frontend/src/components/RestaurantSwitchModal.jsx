import React from "react";
import { X, AlertTriangle } from "lucide-react";

const RestaurantSwitchModal = ({
  isOpen,
  onClose,
  onClearAndAdd,
  currentRestaurant = "Restaurant",
  newRestaurant = "Restaurant",
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-orange-600" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Replace cart item?
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Your cart contains items from
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold text-gray-900">
                {currentRestaurant}
              </span>
            </p>
            <p className="text-xs text-gray-600">
              Do you want to discard the selection and add items from{" "}
              <span className="font-semibold text-gray-900">
                {newRestaurant}
              </span>
              ?
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-green-600 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors"
          >
            NO
          </button>
          <button
            onClick={onClearAndAdd}
            className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
          >
            YES, START AFRESH
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSwitchModal;
