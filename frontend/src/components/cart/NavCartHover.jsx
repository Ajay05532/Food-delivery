import { useSelector } from "react-redux";
import { useCart } from "../../redux/hooks/useCart";

const CartHover = () => {
  const { items, totalQuantity, totalPrice, image } = useCart();
  const subtotal = totalPrice;

  console.log("Cart Image URL:", image);

  return (
    <div
      className="
      absolute right-0 top-full mt-2 w-[360px] bg-white shadow-xl rounded-lg p-4
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-200 z-[200]
    "
    >
      {/* Restaurant Name */}
      <div className="flex items-start gap-3 border-b pb-3">
        {image ? (
          <img
            src={image}
            alt="Restaurant"
            className="w-14 h-14 rounded-md object-cover"
          />
        ) : (
          <div className="w-14 h-14 bg-gray-200 rounded-md animate-pulse" />
        )}
        <div>
          {/* Changed items[0]?.restaurant to items[0]?.restaurantName */}
          <h3 className="font-semibold">
            {items[0]?.restaurantName || "Restaurant"}
          </h3>
          <button className="text-blue-600 text-xs font-medium">
            VIEW FULL MENU
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="py-3 border-b">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between py-1 text-sm text-gray-700"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="py-3 flex justify-between text-gray-800 font-medium">
        <span>Sub total</span>
        <span>₹{subtotal}</span>
      </div>

      <button className="w-full bg-orange-600 text-white py-3 font-semibold rounded-md hover:bg-orange-700">
        CHECKOUT
      </button>
    </div>
  );
};

export default CartHover;
