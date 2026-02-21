import React from "react";
import { useSelector } from "react-redux";
import { useCart } from "../../redux/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, UtensilsCrossed } from "lucide-react";

const CartHover = () => {
  const {
    items,
    totalQuantity,
    totalPrice,
    image,
    restaurantName,
    restaurantId,
  } = useCart();
  const subtotal = totalPrice;
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 top-full mt-4 w-[380px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] rounded-[2rem] p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border border-white/20 dark:border-gray-800 transform origin-top-right group-hover:scale-100 scale-95">
      {items.length === 0 ? (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
            <ShoppingBag className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          </div>
          <p className="text-base font-bold text-gray-900 dark:text-white mb-1">
            Your cart is empty
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Add some items from the menu
          </p>
        </div>
      ) : (
        // Filled Cart State
        <>
          {/* Restaurant Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-dashed border-gray-200 dark:border-gray-800">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700">
              {image ? (
                <img
                  src={image}
                  alt={restaurantName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-black text-gray-900 dark:text-white text-base truncate mb-0.5">
                {restaurantName || "Restaurant"}
              </h3>
              <button
                className="text-orange-500 dark:text-orange-400 text-xs font-bold hover:text-orange-600 dark:hover:text-orange-300 transition-colors uppercase tracking-wider flex items-center gap-1 group/menu"
                onClick={() => {
                  if (restaurantId) navigate(`/restaurant/${restaurantId}`);
                }}
              >
                View Menu{" "}
                <ArrowRight className="w-3 h-3 group-hover/menu:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="py-4 space-y-3 max-h-[220px] overflow-y-auto scrollbar-hide border-b border-gray-100 dark:border-gray-800/60 flex-1">
            <style>{`div::-scrollbar { display: none; }`}</style>
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div
                    className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center mt-1 shrink-0 ${item.isVeg ? "border-green-500" : "border-red-500"}`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                      QTY: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-black text-sm text-gray-900 dark:text-white shrink-0 mt-0.5">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Area (Subtotal & Checkout) */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 sticky bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-extrabold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                Subtotal
              </span>
              <span className="text-xl font-black text-gray-900 dark:text-white">
                ₹{subtotal}
              </span>
            </div>

            <button
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3.5 px-4 font-black rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              onClick={() => navigate("/checkout")}
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartHover;
