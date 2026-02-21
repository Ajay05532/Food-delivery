import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../../redux/slices/userSlice";
import { User, Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";

const SignUp = ({ switchToLogin, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      dispatch(setError("All fields are required"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, phone, email, role: "user" },
        { withCredentials: true },
      );

      setSuccess("Account saved! Sending OTP...");

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
      {success && (
        <div className="mb-6 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded-r-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500" />
            <div className="relative flex items-center bg-white dark:bg-gray-900 border-2 border-transparent group-focus-within:border-orange-500 rounded-2xl overflow-hidden transition-all shadow-sm">
              <div className="px-4 text-gray-400">
                <User size={20} strokeWidth={2.5} />
              </div>
              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent outline-none text-gray-900 dark:text-white font-bold placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500" />
            <div className="relative flex items-center bg-white dark:bg-gray-900 border-2 border-transparent group-focus-within:border-orange-500 rounded-2xl overflow-hidden transition-all shadow-sm">
              <div className="px-4 text-gray-400">
                <Phone size={20} strokeWidth={2.5} />
              </div>
              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent outline-none text-gray-900 dark:text-white font-bold placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500" />
            <div className="relative flex items-center bg-white dark:bg-gray-900 border-2 border-transparent group-focus-within:border-orange-500 rounded-2xl overflow-hidden transition-all shadow-sm">
              <div className="px-4 text-gray-400">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent outline-none text-gray-900 dark:text-white font-bold placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-md mt-4 shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2 group"
        >
          Create Account{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-dashed border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-extrabold transition-colors active:scale-95"
          >
            Log in instead
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
