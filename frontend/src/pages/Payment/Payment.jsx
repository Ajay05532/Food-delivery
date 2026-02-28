import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Banknote,
  Percent,
  Plus,
  AlertCircle,
  Loader2,
  Star,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import AddNewUPI from "./section/AddNewUPI";
import AddNewCard from "./section/AddNewCard";
import PaymentOption from "./section/PaymentOption";
import OrderSummary from "./section/OrderSummary";

import { placeOrder } from "../../redux/slices/orderSlice";
import { clearCartAsync, clearCart } from "../../redux/slices/cartSlice";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  loadRazorpayScript,
} from "../../services/payment.service";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    finalAmount: passedFinalAmount = null,
    appliedCoupon: passedCoupon = null,
    discount: passedDiscount = 0,
  } = location.state || {};

  const { items, totalPrice, restaurantName } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.user);
  const { items: savedAddresses } = useSelector((s) => s.address);

  const finalAmount = passedFinalAmount ?? totalPrice;

  const [view, setView] = useState("list");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const [upiList, setUpiList] = useState([]);
  const [cardList, setCardList] = useState([]);

  const handleAddUPI = (id) => {
    setUpiList([
      ...upiList,
      {
        id: `upi_${id}`,
        title: id,
        icon: <div className="font-bold text-slate-600 text-xs">UPI</div>,
        type: "component",
      },
    ]);
    setView("list");
  };
  const handleAddCard = (details) => {
    setCardList([
      ...cardList,
      {
        id: `card_${details.cardNumber?.slice(-4)}`,
        title: details.nameOnCard || "New Card",
        subtitle: `**** ${details.cardNumber?.slice(-4)}`,
        icon: <CreditCard className="w-5 h-5 text-slate-600" />,
      },
    ]);
    setView("list");
  };

  const deliveryAddress = savedAddresses?.[0]
    ? {
        label: savedAddresses[0].label || "Home",
        street: savedAddresses[0].street || "",
        area: savedAddresses[0].area || "",
        city: savedAddresses[0].city || "",
      }
    : { label: "Home", street: "", area: "Default", city: "" };

  const addressDisplay = savedAddresses?.[0]
    ? [savedAddresses[0].street, savedAddresses[0].area, savedAddresses[0].city]
        .filter(Boolean)
        .join(", ")
    : "No address saved";

  const handleCOD = async () => {
    setIsProcessing(true);
    setOrderError(null);
    try {
      await dispatch(
        placeOrder({ address: deliveryAddress, paymentMethod: "COD" }),
      ).unwrap();
      dispatch(clearCart());
      await dispatch(clearCartAsync());
      navigate("/orders");
    } catch (err) {
      setOrderError(
        typeof err === "string"
          ? err
          : "Failed to place order. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRazorpay = async (method) => {
    setIsProcessing(true);
    setOrderError(null);
    try {
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded)
        throw new Error(
          "Failed to load Razorpay SDK. Check your internet connection.",
        );

      const rzpData = await createRazorpayOrder({
        amount: finalAmount,
      });

      navigate("/payment/upi-pending", {
        state: {
          razorpayOrderId: rzpData.razorpayOrderId,
          amount: rzpData.amount,
          currency: rzpData.currency || "INR",
          paymentId: rzpData.paymentId,
          deliveryAddress,
          restaurantName,
          userInfo: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
          },
        },
      });
    } catch (err) {
      setOrderError(err?.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (view === "add-upi")
    return <AddNewUPI onBack={() => setView("list")} onVerify={handleAddUPI} />;
  if (view === "add-card")
    return <AddNewCard onBack={() => setView("list")} onSave={handleAddCard} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md p-4 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-500 shadow-sm rounded-2xl transition-all group"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 tracking-tight">
              Select Payment Method
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {items.length} items •{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                Total: ₹{finalAmount}
              </span>
            </p>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {orderError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 border-2 border-red-500/50 text-red-700 dark:text-red-400 rounded-2xl p-4 mb-6 shadow-sm"
            >
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="text-sm font-bold">{orderError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <OrderSummary
          restaurant={{ name: restaurantName }}
          items={items}
          total={finalAmount}
          savings={passedDiscount}
          appliedCoupon={passedCoupon}
          address={addressDisplay}
        />

        {/* Savings banner */}
        <AnimatePresence>
          {passedDiscount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-500/50 rounded-2xl p-5 flex items-center gap-4 mb-8 shadow-sm"
            >
              <div className="bg-emerald-500 p-2 rounded-xl shadow-inner rotate-12 shrink-0">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-emerald-800 dark:text-emerald-300 font-extrabold leading-tight">
                  Awesome! You saved{" "}
                  <span className="text-xl">₹{passedDiscount}</span>
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Coupon applied successfully.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Badges */}
        <div className="flex items-center gap-4 justify-center mb-8 px-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 100% Secure
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4" /> Trusted
          </div>
        </div>

        {/* Payment Methods Container */}
        <div className="space-y-8">
          {/* UPI */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-500 flex items-center justify-center text-sm shadow-inner">
                ⚡
              </span>
              UPI & Online Payments
            </h3>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transform transition-all hover:border-gray-300 dark:hover:border-gray-700">
              <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 italic text-xl">
                    UPI
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
                    Instant & Zero Fees
                  </span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-white shadow-sm flex items-center justify-center p-1.5">
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-white shadow-sm font-extrabold text-[8px] text-blue-600 flex items-center justify-center">
                    GPay
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 bg-gray-50/30 dark:bg-gray-800/20">
                {upiList.map((upi) => (
                  <PaymentOption
                    key={upi.id}
                    icon={
                      upi.type === "image" ? (
                        <img
                          src={upi.icon}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      ) : (
                        upi.icon
                      )
                    }
                    title={upi.title}
                    selected={selectedMethod === upi.id}
                    onSelect={() => setSelectedMethod(upi.id)}
                    recommended={upi.recommended}
                  >
                    <button
                      onClick={() => handleRazorpay("upi")}
                      disabled={isProcessing}
                      className="w-full mt-2 relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 group"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />{" "}
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay ₹{finalAmount} Now <ArrowRightIcon />
                        </>
                      )}
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                    </button>
                  </PaymentOption>
                ))}

                <button
                  onClick={() => setView("add-upi")}
                  className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 w-full hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-800 dark:hover:border-orange-500 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:border-orange-200 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors">
                      Add New UPI ID
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Link a new VPA to proceed
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-500/20 text-pink-500 flex items-center justify-center text-sm shadow-inner">
                💳
              </span>
              Credit & Debit Cards
            </h3>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              {cardList.map((card) => (
                <PaymentOption
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                  subtitle={card.subtitle}
                  selected={selectedMethod === card.id}
                  onSelect={() => setSelectedMethod(card.id)}
                >
                  <button
                    onClick={() => handleRazorpay("card")}
                    disabled={isProcessing}
                    className="w-full mt-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 disabled:opacity-50 text-white dark:text-gray-900 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />{" "}
                        Authorization...
                      </>
                    ) : (
                      `Pay ₹${finalAmount} Securely`
                    )}
                  </button>
                </PaymentOption>
              ))}

              <button
                onClick={() => setView("add-card")}
                className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 w-full hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-gray-800 dark:hover:border-pink-500 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-pink-500 group-hover:border-pink-200 transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-pink-500 transition-colors">
                    Add New Card
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Save card for faster checkout
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* More Options */}
          <div className="space-y-4 pb-10">
            <h3 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 flex items-center justify-center text-sm shadow-inner">
                🏦
              </span>
              More Options
            </h3>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <PaymentOption
                icon={<Wallet className="w-6 h-6 text-purple-500" />}
                title="Wallets"
                subtitle="Paytm, Amazon Pay, Mobikwik"
                selected={selectedMethod === "wallets"}
                onSelect={() => setSelectedMethod("wallets")}
              >
                <button
                  onClick={() => handleRazorpay("wallet")}
                  disabled={isProcessing}
                  className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />{" "}
                      Redirection...
                    </>
                  ) : (
                    `Pay ₹${finalAmount} via Wallet`
                  )}
                </button>
              </PaymentOption>

              <PaymentOption
                icon={<Banknote className="w-6 h-6 text-emerald-500" />}
                title="Cash on Delivery"
                subtitle="Pay via Cash / UPI at doorstep"
                selected={selectedMethod === "cod"}
                onSelect={() => setSelectedMethod("cod")}
              >
                <button
                  onClick={handleCOD}
                  disabled={isProcessing}
                  className="w-full mt-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 disabled:opacity-50 text-white dark:text-gray-900 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Placing
                      Order...
                    </>
                  ) : (
                    "Confirm Order via COD"
                  )}
                </button>
              </PaymentOption>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default Payment;
