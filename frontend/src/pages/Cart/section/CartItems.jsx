import React from "react";
import { Plus, Minus, X } from "lucide-react";

const CartItems = ({ items, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem, restaurantName }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Restaurant Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <span className="text-xl">🍽️</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{restaurantName}</h3>
          <p className="text-xs text-gray-500">Secure checkout from this restaurant</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
            {/* Item Image */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {/* Item Type */}
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                        item.type === "veg"
                          ? "border-green-600"
                          : "border-red-600"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.type === "veg" ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900">
                      {item.name}
                    </h4>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Price */}
              <p className="text-sm font-bold text-gray-900 mb-2">
                ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecreaseQuantity(item.id)}
                  className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>
                <span className="w-8 text-center font-bold text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onIncreaseQuantity(item.id)}
                  className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <textarea
          placeholder="Any suggestions? We will pass it on..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:outline-none resize-none"
          rows="2"
        />
      </div>
    </div>
  );
};

export default CartItems;