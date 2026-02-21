import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../redux/hooks/useCart";
import { useAddress } from "../../redux/hooks/useAddress";
import emptyCart from "../../assets/empty_cart.png";
import AddressModal from "./section/AddressModal";
import CouponModal from "./section/CouponModal";
import CartItems from "./section/CartItems";
import BillDetails from "./section/BillDetails";
import AuthPrompt from "./section/AuthPrompt";
import {
  MapPin,
  Wallet,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Utensils,
  ArrowRight,
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const {
    items,
    totalPrice,
    totalQuantity,
    restaurantName,
    restaurantId,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const { addresses, getAddresses } = useAddress();

  useEffect(() => {
    if (isAuthenticated) getAddresses();
  }, [isAuthenticated, getAddresses]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const defaultAddr =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [addresses, selectedAddress]);

  const increaseQuantity = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) updateQuantity(id, item.quantity + 1);
  };

  const decreaseQuantity = (id) => {
    const item = items.find((i) => i.id === id);
    if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1);
    else if (item && item.quantity === 1) removeItem(id);
  };

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [noContactDelivery, setNoContactDelivery] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center gap-6 py-20 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
          <img
            src={emptyCart}
            alt="Empty Cart"
            className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl"
          />
        </motion.div>
        <div className="flex flex-col gap-3 items-center text-center max-w-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Looks like you haven't made your choice yet. Explore our top
            restaurants!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all w-fit"
          >
            Explore Restaurants <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const discount = appliedCoupon?.discountAmount ?? 0;
  const gstAndCharges = Math.round(totalPrice * 0.05);
  const deliveryFee = 0;
  const finalAmount = totalPrice + deliveryFee + gstAndCharges - discount;

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) return alert("Please login to place an order");
    if (!selectedAddress) return alert("Please select a delivery address");
    navigate("/payment", { state: { finalAmount, appliedCoupon, discount } });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300">
      {/* Decorative bg glow */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            Secure Checkout
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Review your items and complete your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {!isAuthenticated && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <AuthPrompt />
              </motion.div>
            )}

            {/* Address Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-orange-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedAddress
                      ? "Delivery Address"
                      : "Add Delivery Address"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedAddress
                      ? "Your order will be delivered here"
                      : "You seem to be in a new location"}
                  </p>
                </div>
              </div>

              {selectedAddress ? (
                <div
                  className="group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-orange-500/50 rounded-2xl p-5 hover:border-orange-500 transition-colors cursor-pointer"
                  onClick={() => setShowAddressModal(true)}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-bl-[100px] pointer-events-none" />
                  <div className="flex items-start justify-between relative z-10">
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900 dark:text-white capitalize">
                          {selectedAddress.label || "Home"}
                        </p>
                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-1">
                        {selectedAddress.street}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        {selectedAddress.doorFlat && (
                          <span>Flat: {selectedAddress.doorFlat}</span>
                        )}
                        {selectedAddress.landmark && (
                          <span>Landmark: {selectedAddress.landmark}</span>
                        )}
                      </div>
                    </div>
                    <button className="text-orange-500 font-bold text-sm bg-orange-50 dark:bg-gray-900 px-4 py-2 rounded-xl group-hover:bg-orange-100 dark:group-hover:bg-gray-700 transition-colors shrink-0">
                      CHANGE
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold py-4 rounded-2xl hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" /> Add New Address
                </button>
              )}
            </motion.div>

            {/* No Contact Delivery */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm flex items-start gap-4 cursor-pointer"
              onClick={() => setNoContactDelivery(!noContactDelivery)}
            >
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${noContactDelivery ? "bg-orange-500 border-orange-500" : "border-gray-300 dark:border-gray-600"}`}
              >
                {noContactDelivery && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  Opt in for No-contact Delivery
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                  Unwell, or avoiding contact? Partner will safely place the
                  order outside your door. (Not applicable for COD)
                </p>
              </div>
            </motion.div>

            {/* Items */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CartItems
                items={items}
                restaurantName={restaurantName}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onRemoveItem={removeItem}
              />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (Sticky) ── */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Restaurant summary */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-inner">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                    Ordering From
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                    {restaurantName}
                  </p>
                </div>
              </div>

              {/* Coupon Bar */}
              <button
                onClick={() => setShowCouponModal(true)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${appliedCoupon ? "bg-emerald-50 text-emerald-500" : "bg-orange-50 dark:bg-gray-800 text-orange-500"}`}
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-bold text-sm ${appliedCoupon ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white group-hover:text-orange-500"}`}
                    >
                      {appliedCoupon ? "Coupon Applied!" : "Apply Coupon"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {appliedCoupon
                        ? `Saved ₹${discount} with ${appliedCoupon.code}`
                        : "Unlock offers & savings"}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${appliedCoupon ? "text-emerald-500" : "text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1"}`}
                />
              </button>

              {/* Bill Details */}
              <BillDetails items={items} appliedCoupon={appliedCoupon} />

              {/* CTA */}
              <div>
                {!selectedAddress && (
                  <div className="mb-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-2xl p-4 flex gap-3 text-orange-800 dark:text-orange-300 items-center">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-xs font-medium">
                      Please add a delivery address to proceed.
                    </p>
                  </div>
                )}
                <button
                  onClick={handlePlaceOrder}
                  disabled={
                    !selectedAddress || isProcessing || !isAuthenticated
                  }
                  className={`relative w-full overflow-hidden py-4 rounded-2xl font-bold text-white text-lg transition-all shadow-lg ${
                    selectedAddress && !isProcessing && isAuthenticated
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      : "bg-gray-300 dark:bg-gray-800 text-gray-500 shadow-none cursor-not-allowed"
                  }`}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order{" "}
                        <span className="text-white/60 mx-1">•</span> ₹
                        {finalAmount}
                      </>
                    )}
                  </div>
                  {/* shine effect */}
                  {selectedAddress && !isProcessing && isAuthenticated && (
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        restaurantId={restaurantId}
        orderAmount={totalPrice}
      />
    </div>
  );
};
export default Cart;
