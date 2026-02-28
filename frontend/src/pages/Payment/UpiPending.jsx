import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../redux/slices/orderSlice";
import { clearCart, clearCartAsync } from "../../redux/slices/cartSlice";
import {
  loadRazorpayScript,
  verifyRazorpayPayment,
} from "../../services/payment.service";
import {
  Smartphone,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";

/* ── UPI app logos (well-known CDN URLs) ─────────────────── */
const UPI_APPS = [
  {
    name: "PhonePe",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png",
  },
  {
    name: "GPay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png",
  },
  {
    name: "Paytm",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png",
  },
  {
    name: "BHIM",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/BHIM_logo.png/150px-BHIM_logo.png",
  },
];

const STATUS = { WAITING: "waiting", SUCCESS: "success", FAILED: "failed" };

const UpiPending = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const {
    razorpayOrderId,
    amount, // in paise
    currency = "INR",
    paymentId,
    deliveryAddress,
    restaurantName,
    userInfo = {},
  } = state || {};

  const [status, setStatus] = useState(STATUS.WAITING);
  const [errMsg, setErrMsg] = useState("");
  const [elapsed, setElapsed] = useState(0); // seconds since opened
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

  /* ── Tick timer ──────────────────────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  /* ── Auto-open Razorpay modal on mount ───────────────── */
  useEffect(() => {
    if (!razorpayOrderId) {
      // No payment data — go back
      navigate("/payment", { replace: true });
      return;
    }
    openRazorpayModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openRazorpayModal = async () => {
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      setStatus(STATUS.FAILED);
      setErrMsg("Could not load payment SDK. Check your internet.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount,
      currency,
      order_id: razorpayOrderId,
      name: "FoodHub",
      description: `Order from ${restaurantName || "Restaurant"}`,
      image: "https://i.imgur.com/n5tjHFD.png",
      prefill: {
        name: userInfo.name || "",
        email: userInfo.email || "",
        contact: userInfo.phone || "",
      },
      theme: { color: "#f97316" },

      // ── Pin UPI first; show all other Razorpay methods as fallback ──
      config: {
        display: {
          blocks: {
            upi_block: {
              name: "Pay via UPI",
              instruments: [
                { method: "upi", flows: ["collect", "intent", "qr"] },
              ],
            },
          },
          sequence: ["block.upi_block"],
          preferences: { show_default_blocks: true }, // show Cards/Netbanking/Wallet too
        },
      },

      handler: async (response) => {
        try {
          // 1. Create the final order now that payment is approved
          const foodOrder = await dispatch(
            placeOrder({ address: deliveryAddress, paymentMethod: "ONLINE" }),
          ).unwrap();

          if (!foodOrder?._id) {
            throw new Error("Payment succeeded but order creation failed.");
          }

          // 2. Verify the payment and link the new orderId
          await verifyRazorpayPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            foodOrderId: foodOrder._id,
          });
          setStatus(STATUS.SUCCESS);
          dispatch(clearCart()); // sync Redux UI — backend already deleted cart from DB
          // Navigate after 2s so user sees success screen
          setTimeout(() => navigate("/orders", { replace: true }), 2000);
        } catch (err) {
          const backendError =
            typeof err === "string"
              ? err
              : err?.response?.data?.message ||
                err?.message ||
                "Payment verification failed. Contact support if amount was deducted.";
          setStatus(STATUS.FAILED);
          setErrMsg(backendError);
        }
      },

      modal: {
        ondismiss: () => {
          // User closed the modal — stay on this page, show retry
          setStatus(STATUS.FAILED);
          setErrMsg("Payment was cancelled. You can retry below.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (resp) => {
      setStatus(STATUS.FAILED);
      setErrMsg(
        resp.error?.description ||
          "Payment failed. Please try a different method.",
      );
    });
    rzp.open();
  };

  const amountRupees = amount ? (amount / 100).toFixed(2) : "—";

  /* ─── SUCCESS screen ─────────────────────────────────── */
  if (status === STATUS.SUCCESS) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center p-6 transition-colors duration-300">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 animate-bounce shadow-inner border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-10 h-10 text-green-500 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-1 font-medium">
            ₹{amountRupees} paid successfully
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-6 animate-pulse">
            Redirecting to your orders…
          </p>
        </div>
      </div>
    );
  }

  /* ─── FAILED / CANCELLED screen ─────────────────────── */
  if (status === STATUS.FAILED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center p-6 transition-colors duration-300">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-red-200 dark:border-red-900/50">
            <XCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            Payment Failed
          </h1>
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-4 mb-8">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {errMsg}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setStatus(STATUS.WAITING);
                setErrMsg("");
                setElapsed(0);
                openRazorpayModal();
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95 uppercase tracking-widest text-xs"
            >
              Retry Payment
            </button>
            <button
              onClick={() => navigate("/payment")}
              className="w-full border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-600 dark:text-gray-300 font-extrabold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Change Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── WAITING / PENDING screen ───────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 dark:bg-gray-950 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 dark:border-gray-800/50 shadow-2xl p-8 sm:p-10 max-w-md w-full text-center relative z-10 transition-all duration-300">
        {/* Animated phone pulse */}
        <div className="relative flex items-center justify-center mb-10 mt-4">
          <div
            className="absolute w-36 h-36 bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 dark:border-orange-500/30 rounded-full animate-ping delay-75"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute w-28 h-28 bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/20 dark:border-pink-500/30 rounded-full animate-ping delay-300"
            style={{ animationDuration: "3s" }}
          />

          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-[2rem] flex items-center justify-center shadow-xl shadow-orange-500/30 z-10 rotate-3 transform hover:rotate-0 transition-transform duration-500">
            <Smartphone className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
          Request Sent
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 font-medium">
          A payment request of{" "}
          <span className="font-bold text-gray-900 dark:text-gray-100 bg-orange-100 dark:bg-orange-500/20 px-2 py-0.5 rounded-md text-orange-600 dark:text-orange-400 ml-1">
            ₹{amountRupees}
          </span>
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mb-8 max-w-[250px] mx-auto leading-relaxed">
          Open your UPI app and approve the request to complete your order.
        </p>

        {/* UPI app icons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-10">
          {UPI_APPS.map(({ name, logo }) => (
            <div key={name} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800/80 shadow-sm bg-white dark:bg-white p-2 group-hover:scale-110 group-hover:shadow-md group-hover:border-orange-200 transition-all duration-300">
                <img
                  src={logo}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Waiting indicator */}
        <div className="flex items-center justify-center gap-3 text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 py-3 px-6 rounded-2xl inline-flex mx-auto mb-8 border border-orange-100 dark:border-orange-500/20 backdrop-blur-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-bold tracking-wide">
            Waiting for payment...{" "}
            <span className="w-6 inline-block text-left opacity-70">
              {elapsed}s
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setStatus(STATUS.WAITING);
              setErrMsg("");
              setElapsed(0);
              openRazorpayModal();
            }}
            className="w-full border-2 border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-extrabold py-3.5 rounded-xl transition-all text-xs uppercase tracking-widest active:scale-95"
          >
            Reopen Payment Modal
          </button>
          <button
            onClick={() => navigate("/payment")}
            className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2 uppercase tracking-wider flex items-center justify-center gap-1 mx-auto mt-2"
          >
            ← Try different method
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpiPending;
