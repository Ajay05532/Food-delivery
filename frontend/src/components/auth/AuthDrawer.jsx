import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronRight } from "lucide-react";
import Login from "./Login";
import SignUp from "./SignUp";
import Otp from "./Otp";

const AuthDrawer = ({ open, onClose }) => {
  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [devOtp, setDevOtp] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            onClick={onClose}
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl z-[9999] shadow-2xl flex flex-col border-l border-white/20 dark:border-gray-800"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors group z-20"
              onClick={onClose}
            >
              <X
                size={20}
                className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
              />
            </button>

            {/* Header Banner */}
            <div className="relative pt-12 pb-8 px-8 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-500/10 dark:to-pink-500/10 overflow-hidden shrink-0 border-b border-gray-100 dark:border-gray-800/60">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 shadow-xl shadow-orange-500/10 flex items-center justify-center border border-white/50 dark:border-gray-700/50 shrink-0 transform -rotate-6">
                  <span className="text-3xl filter drop-shadow-md">
                    {mode === "login" ? "🍔" : "✨"}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1 flex items-center gap-2">
                    {mode === "login"
                      ? "Welcome Back"
                      : mode === "signup"
                        ? "Join FoodHub"
                        : "Verify Number"}
                  </h2>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    {mode === "login"
                      ? "Log in to satisfy your cravings"
                      : mode === "signup"
                        ? "Sign up for exclusive tasty deals"
                        : "Enter the OTP sent to your phone"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 overflow-y-auto px-8 py-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {mode === "login" ? (
                    <Login
                      switchToSignup={() => setMode("signup")}
                      onSuccess={(p, otp) => {
                        setPhone(p);
                        setDevOtp(otp || null);
                        setMode("otp");
                      }}
                      onClose={onClose}
                    />
                  ) : mode === "signup" ? (
                    <SignUp
                      switchToLogin={() => setMode("login")}
                      onSuccess={(p, otp) => {
                        setPhone(p);
                        setDevOtp(otp || null);
                        setMode("otp");
                      }}
                      onClose={onClose}
                    />
                  ) : (
                    <Otp phone={phone} devOtp={devOtp} onSuccess={onClose} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthDrawer;
