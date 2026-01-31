import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../redux/hooks/useCart";
import emptyCart from "../../assets/empty_cart.png";
import AddressModal from "./section/AddressModal";
import CouponModal from "./section/CouponModal";
import CartItems from "./section/CartItems";
import BillDetails from "./section/BillDetails";
import { MapPin, Wallet, AlertCircle, ChevronRight } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    totalPrice,
    totalQuantity,
    restaurantName,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [noContactDelivery, setNoContactDelivery] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Empty Cart State
  if (!items || items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-2 py-20">
        <img
          src={emptyCart}
          alt="Empty Cart"
          className="w-64 h-64 object-contain"
        />
        <div className="flex flex-col gap-3 items-center">
          <p className="text-xl font-semibold text-gray-900">Your cart is empty</p>
          <span className="font-light text-gray-600">
            You can go to home page to view more restaurants
          </span>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg w-[190px] font-semibold hover:bg-orange-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Calculate final amount with discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount.includes("%")) {
      const percentage = parseInt(appliedCoupon.discount);
      discount = Math.round(totalPrice * (percentage / 100));
    } else {
      discount = parseInt(appliedCoupon.discount);
    }
  }

  const gstAndCharges = Math.round(totalPrice * 0.05);
  const deliveryFee = 0;
  const finalAmount = totalPrice + deliveryFee + gstAndCharges - discount;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success and clear cart
      alert("Order placed successfully!");
      clearCart();
      navigate("/order-tracking");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  // Checkout State
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate("/")}
              className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:bg-orange-600 transition-colors"
            >
              🍽️
            </div>
            <h1 className="text-lg font-bold text-gray-900">SECURE CHECKOUT</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors">
              Help
            </button>
            <button className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors">
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery & Cart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Add a delivery address
                  </h2>
                  <p className="text-sm text-gray-600">
                    You seem to be in the new location
                  </p>
                </div>
              </div>

              {selectedAddress ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-900 capitalize">
                        {selectedAddress.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedAddress.street}
                      </p>
                      {selectedAddress.doorFlat && (
                        <p className="text-xs text-gray-500">
                          Flat: {selectedAddress.doorFlat}
                        </p>
                      )}
                      {selectedAddress.landmark && (
                        <p className="text-xs text-gray-500">
                          Landmark: {selectedAddress.landmark}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="w-full border-2 border-teal-500 text-teal-600 font-bold py-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  + ADD NEW ADDRESS
                </button>
              )}
            </div>

            {/* No Contact Delivery */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={noContactDelivery}
                  onChange={(e) => setNoContactDelivery(e.target.checked)}
                  className="mt-1 w-5 h-5 text-orange-500 rounded border-gray-300 cursor-pointer"
                />
                <div>
                  <p className="font-bold text-gray-900">
                    Opt in for No-contact Delivery
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Unwell, or avoiding contact? Please select no-contact delivery. Partner
                    will safely place the order outside your door (not for COD)
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <CartItems
              items={items}
              restaurantName={restaurantName}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
              onRemoveItem={removeFromCart}
            />

            {/* Payment Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="text-orange-500" size={24} />
                <h2 className="text-lg font-bold text-gray-900">Payment</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Credit Card", "Debit Card", "UPI", "Wallet", "NetBanking"].map(
                  (method, idx) => (
                    <button
                      key={idx}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-sm font-semibold text-gray-700"
                    >
                      {method}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Bill & Order Summary */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {/* Restaurant Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🍛</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{restaurantName}</p>
                  <p className="text-xs text-gray-500">Connaught Place</p>
                </div>
              </div>
            </div>

            {/* Bill Details */}
            <BillDetails items={items} appliedCoupon={appliedCoupon} />

            {/* Coupon */}
            <button
              onClick={() => setShowCouponModal(true)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between hover:border-orange-500 hover:bg-orange-50 transition-colors group"
            >
              <span className="font-semibold text-gray-700 group-hover:text-orange-600">
                🎟️ {appliedCoupon ? `${appliedCoupon.code} Applied` : "Apply Coupon"}
              </span>
              <ChevronRight className="text-gray-400 group-hover:text-orange-500" />
            </button>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!selectedAddress || isProcessing}
              className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all ${
                selectedAddress && !isProcessing
                  ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </span>
              ) : (
                `Place Order • ₹${finalAmount}`
              )}
            </button>

            {!selectedAddress && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
                <AlertCircle className="text-yellow-600 flex-shrink-0" size={18} />
                <p className="text-xs text-yellow-800">
                  Please add a delivery address to proceed
                </p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{totalQuantity} items</span>
                  <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>{appliedCoupon.code} Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={setSelectedAddress}
      />

      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onApplyCoupon={handleApplyCoupon}
        appliedCoupon={appliedCoupon}
      />
    </div>
  );
};

export default Cart;