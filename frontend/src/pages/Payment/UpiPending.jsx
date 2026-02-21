import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  // State passed from Payment.jsx: { razorpayOrderId, amount, currency, paymentId, foodOrderId, restaurantName }
  const {
    razorpayOrderId,
    amount, // in paise
    currency = "INR",
    paymentId,
    foodOrderId,
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
          await verifyRazorpayPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            foodOrderId,
          });
          setStatus(STATUS.SUCCESS);
          dispatch(clearCart()); // sync Redux UI — backend already deleted cart from DB
          // Navigate after 2s so user sees success screen
          setTimeout(() => navigate("/orders", { replace: true }), 2000);
        } catch {
          setStatus(STATUS.FAILED);
          setErrMsg(
            "Payment verification failed. Contact support if amount was deducted.",
          );
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-500 mb-1">
            ₹{amountRupees} paid successfully
          </p>
          <p className="text-sm text-gray-400">Redirecting to your orders…</p>
        </div>
      </div>
    );
  }

  /* ─── FAILED / CANCELLED screen ─────────────────────── */
  if (status === STATUS.FAILED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Not Completed
          </h1>
          <p className="text-sm text-gray-500 mb-8">{errMsg}</p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setStatus(STATUS.WAITING);
                setErrMsg("");
                setElapsed(0);
                openRazorpayModal();
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Retry Payment
            </button>
            <button
              onClick={() => navigate("/payment")}
              className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Choose Different Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── WAITING / PENDING screen ───────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Animated phone pulse */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-32 h-32 bg-orange-100 rounded-full animate-ping opacity-30" />
          <div className="absolute w-24 h-24 bg-orange-200 rounded-full animate-ping opacity-40 delay-150" />
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-10">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          UPI Request Sent!
        </h1>
        <p className="text-gray-500 text-sm mb-1">
          A payment request of{" "}
          <span className="font-bold text-gray-800">₹{amountRupees}</span> has
          been sent.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Please open your UPI app and approve the request to complete your
          order.
        </p>

        {/* UPI app icons */}
        <div className="flex justify-center gap-5 mb-8">
          {UPI_APPS.map(({ name, logo }) => (
            <div key={name} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white p-1">
                <img
                  src={logo}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Waiting indicator */}
        <div className="flex items-center justify-center gap-2 text-orange-500 mb-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">
            Waiting for payment… {elapsed}s
          </span>
        </div>

        {/* Steps */}
        <div className="bg-orange-50 rounded-2xl p-4 text-left space-y-3 mb-8">
          {[
            { n: 1, text: "Open your UPI app (PhonePe, GPay, Paytm, etc.)" },
            { n: 2, text: "Check for the FoodHub payment request" },
            { n: 3, text: "Approve the ₹" + amountRupees + " request" },
            { n: 4, text: "Your order will be confirmed automatically" },
          ].map(({ n, text }) => (
            <div key={n} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {n}
              </div>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setStatus(STATUS.WAITING);
              setErrMsg("");
              setElapsed(0);
              openRazorpayModal();
            }}
            className="w-full border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-bold py-3 rounded-xl transition-colors text-sm"
          >
            Reopen Payment Modal
          </button>
          <button
            onClick={() => navigate("/payment")}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
          >
            ← Try a different payment method
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpiPending;
