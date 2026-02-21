import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setError } from "../../redux/slices/userSlice";
import { Phone, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";

const Login = ({ switchToSignup, onClose, onSuccess }) => {
  const [phone, setPhone] = useState("9162384894");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      dispatch(setError("Phone number is required"));
      return;
    }
    if (phone.trim().length < 10) {
      dispatch(setError("Please enter a valid phone number"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { phone },
        { withCredentials: true },
      );

      setSuccess("OTP sent successfully!");

      setTimeout(() => {
        if (onSuccess) onSuccess(phone);
      }, 1000);
    } catch (err) {
      dispatch(
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again.",
        ),
      );
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-bold rounded-r-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded-r-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
            <div className="relative flex items-center bg-white dark:bg-gray-900 border-2 border-transparent group-focus-within:border-orange-500 rounded-2xl overflow-hidden transition-all shadow-sm">
              <div className="px-4 text-gray-400">
                <Phone size={20} strokeWidth={2.5} />
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-4 bg-transparent outline-none text-gray-900 dark:text-white font-bold placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
            </>
          ) : (
            <>
              Continue securely{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-dashed border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          New to FoodHub?{" "}
          <button
            onClick={switchToSignup}
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-extrabold transition-colors active:scale-95 inline-flex items-center"
          >
            Create an account
          </button>
        </p>
      </div>

      <div className="mt-auto pt-8">
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 text-center uppercase tracking-widest leading-relaxed">
          By continuing, you agree to our
          <br />
          <span className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-orange-500 transition-colors">
            Terms of Service
          </span>{" "}
          &{" "}
          <span className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-orange-500 transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
