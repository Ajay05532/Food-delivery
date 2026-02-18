import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../../redux/hooks/useCart";
import { useAddress } from "../../redux/hooks/useAddress";
import emptyCart from "../../assets/empty_cart.png";
import AddressModal from "./section/AddressModal";
import CouponModal from "./section/CouponModal";
import CartItems from "./section/CartItems";
import BillDetails from "./section/BillDetails";
import AuthPrompt from "./section/AuthPrompt";
import { MapPin, Wallet, AlertCircle, ChevronRight } from "lucide-react";
import Payment from "../Payment/Payment";

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const {
    items,
    totalPrice,
    totalQuantity,
    restaurantName,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const { addresses, getAddresses } = useAddress();

  useEffect(() => {
    if (isAuthenticated) {
      getAddresses();
    }
  }, [isAuthenticated, getAddresses]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const defaultAddr =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [addresses, selectedAddress]);

  // Wrapper functions for quantity changes
  const increaseQuantity = (id) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeItem(id);
    }
  };

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [noContactDelivery, setNoContactDelivery] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Empty Cart State
  if (!items || items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col justify-center items-center gap-2 py-20">
        <img
          src={emptyCart}
          alt="Empty Cart"
          className="w-64 h-64 object-contain"
        />
        <div className="flex flex-col gap-3 items-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            Your cart is empty
          </p>
          <span className="font-light text-gray-600 dark:text-gray-400">
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
    if (!isAuthenticated) {
      alert("Please login to place an order");
      return;
    } else if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/payment");
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery & Cart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Auth Prompt - Show if not authenticated */}
            {!isAuthenticated && <AuthPrompt />}

            {/* Address Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <div className="flex items-start gap-4 mb-4">
                <MapPin
                  className="text-orange-500 flex-shrink-0 mt-1"
                  size={24}
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {selectedAddress
                      ? "Delivery Address"
                      : "Add a delivery address"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedAddress
                      ? "Your order will be delivered here"
                      : "You seem to be in the new location"}
                  </p>
                </div>
              </div>

              {selectedAddress ? (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white capitalize">
                        {selectedAddress.label || "Home"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {selectedAddress.street}
                      </p>
                      {selectedAddress.doorFlat && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Flat: {selectedAddress.doorFlat}
                        </p>
                      )}
                      {selectedAddress.landmark && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
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
                  className="w-full border-2 border-teal-500 text-teal-600 dark:text-teal-400 font-bold py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                >
                  + ADD NEW ADDRESS
                </button>
              )}
            </div>

            {/* No Contact Delivery */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={noContactDelivery}
                  onChange={(e) => setNoContactDelivery(e.target.checked)}
                  className="mt-1 w-5 h-5 text-orange-500 rounded border-gray-300 cursor-pointer"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    Opt in for No-contact Delivery
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Unwell, or avoiding contact? Please select no-contact
                    delivery. Partner will safely place the order outside your
                    door (not for COD)
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
              onRemoveItem={removeItem}
            />

            {/* Payment Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="text-orange-500" size={24} />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Payment
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Credit Card",
                  "Debit Card",
                  "UPI",
                  "Wallet",
                  "NetBanking",
                ].map((method, idx) => (
                  <button
                    key={idx}
                    className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300 bg-transparent"
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Bill & Order Summary */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {/* Restaurant Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🍛</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {restaurantName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Connaught Place
                  </p>
                </div>
              </div>
            </div>

            {/* Bill Details */}
            <BillDetails items={items} appliedCoupon={appliedCoupon} />

            {/* Coupon */}
            <button
              onClick={() => setShowCouponModal(true)}
              className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors group bg-white dark:bg-gray-800"
            >
              <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-500">
                🎟️{" "}
                {appliedCoupon
                  ? `${appliedCoupon.code} Applied`
                  : "Apply Coupon"}
              </span>
              <ChevronRight className="text-gray-400 group-hover:text-orange-500" />
            </button>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!selectedAddress || isProcessing || !isAuthenticated}
              className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all ${
                selectedAddress && !isProcessing && isAuthenticated
                  ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
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
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 flex gap-2">
                <AlertCircle
                  className="text-yellow-600 dark:text-yellow-500 flex-shrink-0"
                  size={18}
                />
                <p className="text-xs text-yellow-800 dark:text-yellow-400">
                  Please add a delivery address to proceed
                </p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {totalQuantity} items
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ₹{totalPrice}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
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
