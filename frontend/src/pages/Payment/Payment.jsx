import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Banknote,
  Percent,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

import AddNewUPI from "./section/AddNewUPI";
import AddNewCard from "./section/AddNewCard";
import PaymentOption from "./section/PaymentOption";
import OrderSummary from "./section/OrderSummary";
import { placeOrder } from "../../redux/slices/orderSlice";
import { clearCartAsync } from "../../redux/slices/cartSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalPrice, restaurantName, restaurantId } = useSelector(
    (state) => state.cart,
  );
  // console.log(items, totalPrice, restaurantName, restaurantId);

  const { user } = useSelector((state) => state.user);

  // console.log(user);

  const [view, setView] = useState("list"); // 'list', 'add-upi', 'add-card'
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Dynamic Lists State
  const [upiList, setUpiList] = useState([
    {
      id: "upi_phonepe",
      title: "9162384894@ybl",
      icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png",
      recommended: true,
      type: "image",
    },
    {
      id: "upi_gpay",
      title: "7903800656@axl",
      icon: <div className="font-bold text-purple-600 text-xs">GPay</div>,
      type: "component",
    },
  ]);

  const [cardList, setCardList] = useState([
    {
      id: "card_bob",
      title: "Bank of Baroda Card",
      subtitle: "**** 5692",
      icon: <CreditCard className="w-5 h-5 text-slate-600" />,
    },
  ]);

  const handleAddUPI = (newUpiId) => {
    const newItem = {
      id: `upi_${newUpiId}`,
      title: newUpiId,
      icon: <div className="font-bold text-slate-600 text-xs">UPI</div>, // Generic icon for new UPI
      type: "component",
    };
    setUpiList([...upiList, newItem]);
    setView("list");
  };

  const handleAddCard = (cardDetails) => {
    const newItem = {
      id: `card_${cardDetails.cardNumber.slice(-4)}`,
      title: cardDetails.nameOnCard || "New Card",
      subtitle: `**** ${cardDetails.cardNumber.slice(-4)}`,
      icon: <CreditCard className="w-5 h-5 text-slate-600" />,
    };
    setCardList([...cardList, newItem]);
    setView("list");
  };

  // Mock data for savings - in a real app this would come from backend/cart
  const savings = 350;
  const finalAmount = totalPrice;

  const handlePayment = async (method) => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(async () => {
      const orderData = {
        restaurantId,
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        totalAmount: finalAmount,
        paymentMethod: method,
        deliveryAddress: user?.address || "Default Address", // Fallback
      };

      try {
        // Dispatch order creation
        // Note: You might want to uncomment this when backend is ready
        // await dispatch(placeOrder(orderData)).unwrap();
        // await dispatch(clearCartAsync());

        // For now, just navigate to success or home
        navigate("/order");
      } catch (error) {
        console.error("Payment failed", error);
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  /* if (!items.length) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Cart is Empty
          </h2>
          <p className="text-slate-500 mb-6">
            Add items to your cart to proceed with payment.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }
*/

  if (view === "add-upi") {
    return <AddNewUPI onBack={() => setView("list")} onVerify={handleAddUPI} />;
  }

  if (view === "add-card") {
    return <AddNewCard onBack={() => setView("list")} onSave={handleAddCard} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Payment Options
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              {items.length} items • Total: ₹{finalAmount}
              {savings > 0 && (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium ml-1">
                  • Savings of ₹{savings}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <OrderSummary
          restaurant={{ name: restaurantName }}
          items={items}
          total={finalAmount}
          savings={savings}
          address={
            user?.address ||
            "Flat No 1603 / Tower No 14, Unitech Horizon, Noida, Uttar Pradesh 201310"
          }
        />

        {/* Savings Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 flex items-center gap-3 mb-8"
        >
          <div className="bg-emerald-500 p-1.5 rounded-full">
            <Percent className="w-4 h-4 text-white" />
          </div>
          <p className="text-emerald-800 dark:text-emerald-300 font-medium text-sm">
            Save up to ₹{savings} more with payment offers
          </p>
        </motion.div>

        {/* Payment Methods */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-700 dark:text-gray-300 uppercase text-sm tracking-wide">
            Preferred Payment
          </h3>

          {/* UPI */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-slate-50 dark:bg-gray-700 px-4 py-2 border-b border-slate-100 dark:border-gray-600 flex items-center gap-2">
              <span className="font-bold text-slate-400 dark:text-gray-400 italic text-lg">
                UPI
              </span>
              <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">
                Pay by any UPI App
              </span>
            </div>

            <div className="p-4 space-y-3">
              {upiList.map((upi) => (
                <PaymentOption
                  key={upi.id}
                  icon={
                    upi.type === "image" ? (
                      <img
                        src={upi.icon}
                        alt="UPI"
                        className="w-full h-full object-cover rounded-full"
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
                    onClick={() => handlePayment(upi.id)}
                    disabled={isProcessing}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? "Processing..." : "Pay via UPI"}
                  </button>
                </PaymentOption>
              ))}

              <button
                onClick={() => setView("add-upi")}
                className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-300 dark:border-gray-600 w-full hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 dark:text-orange-400">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-500 dark:text-orange-400">
                    Add New UPI ID
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-gray-500">
                    You need to have a registered UPI ID
                  </p>
                </div>
              </button>
            </div>
          </div>

          <h3 className="font-bold text-slate-700 dark:text-gray-300 uppercase text-sm tracking-wide pt-4">
            Credit & Debit Cards
          </h3>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 p-4">
            {cardList.map((card) => (
              <div key={card.id} className="mb-3">
                <PaymentOption
                  icon={card.icon}
                  title={card.title}
                  subtitle={card.subtitle}
                  selected={selectedMethod === card.id}
                  onSelect={() => setSelectedMethod(card.id)}
                >
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-20 border border-slate-300 dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                      maxLength="3"
                    />
                    <button
                      onClick={() => handlePayment(card.id)}
                      disabled={isProcessing}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
                    >
                      Pay ₹{finalAmount}
                    </button>
                  </div>
                </PaymentOption>
              </div>
            ))}

            <div className="mt-3">
              <button
                onClick={() => setView("add-card")}
                className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-300 dark:border-gray-600 w-full hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-600 dark:text-gray-300">
                  Add New Card
                </span>
              </button>
            </div>
          </div>

          <h3 className="font-bold text-slate-700 dark:text-gray-300 uppercase text-sm tracking-wide pt-4">
            More Options
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 p-4 space-y-3">
            <PaymentOption
              icon={<Wallet className="w-5 h-5 text-slate-600" />}
              title="Wallets"
              subtitle="Paytm, PhonePe, Amazon Pay & more"
              selected={selectedMethod === "wallets"}
              onSelect={() => setSelectedMethod("wallets")}
            />
            <PaymentOption
              icon={<Banknote className="w-5 h-5 text-slate-600" />}
              title="Cash on Delivery"
              subtitle="Pay cash at your doorstep"
              selected={selectedMethod === "cod"}
              onSelect={() => setSelectedMethod("cod")}
            >
              <button
                onClick={() => handlePayment("cod")}
                disabled={isProcessing}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </PaymentOption>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
