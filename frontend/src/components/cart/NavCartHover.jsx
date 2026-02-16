import { useSelector } from "react-redux";
import { useCart } from "../../redux/hooks/useCart";
import { useNavigate } from "react-router-dom";
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
    <div
      className="
      absolute right-0 top-full mt-2 w-[360px] bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-200 z-[200] border border-gray-200 dark:border-gray-700
    "
    >
      {/* Restaurant Name */}
      <div className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
        {image ? (
          <img
            src={image}
            alt="Restaurant"
            className="w-14 h-14 rounded-md object-cover"
          />
        ) : (
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        )}
        <div>
          {/* Changed items[0]?.restaurant to items[0]?.restaurantName */}
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {restaurantName || "Restaurant"}
          </h3>
          <button
            className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline"
            onClick={() => {
              if (restaurantId) {
                navigate(`/restaurant/${restaurantId}`);
              }
            }}
          >
            VIEW FULL MENU
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="py-3 border-b border-gray-200 dark:border-gray-700">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between py-1 text-sm text-gray-700 dark:text-gray-300"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
            Your cart is empty
          </p>
        )}
      </div>

      {/* Total */}
      <div className="py-3 flex justify-between text-gray-800 dark:text-gray-200 font-medium">
        <span>Sub total</span>
        <span>₹{subtotal}</span>
      </div>

      <button
        className="w-full bg-orange-600 text-white py-3 font-semibold rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => navigate("/checkout")}
        disabled={items.length === 0}
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default CartHover;
