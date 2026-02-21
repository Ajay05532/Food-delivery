import React, { useState } from "react";
import { User, LogIn, UserPlus } from "lucide-react";
import AuthDrawer from "../../../components/auth/AuthDrawer";

const AuthPrompt = () => {
  const [showAuthDrawer, setShowAuthDrawer] = useState(false);

  return (
    <>
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-orange-200 dark:hover:border-gray-700 transition-all duration-300 p-6 sm:p-8 mb-8 group relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl flex items-center justify-center shrink-0 border border-white dark:border-gray-700 shadow-sm group-hover:scale-105 transition-transform">
            <User className="text-orange-500 w-8 h-8" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
              Guest Checkout
            </h2>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed mb-6 sm:mb-0">
              Log in to your account for a faster checkout experience, exclusive
              offers, and order tracking.
            </p>
          </div>

          <div className="flex w-full sm:w-auto gap-3 shrink-0">
            <button
              onClick={() => setShowAuthDrawer(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300 font-extrabold py-3.5 px-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all uppercase tracking-widest text-xs active:scale-95"
            >
              <UserPlus className="w-4 h-4" /> Sign Up
            </button>
            <button
              onClick={() => setShowAuthDrawer(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95 uppercase tracking-widest text-xs"
            >
              <LogIn className="w-4 h-4" /> Log In
            </button>
          </div>
        </div>
      </div>

      <AuthDrawer
        open={showAuthDrawer}
        onClose={() => setShowAuthDrawer(false)}
      />
    </>
  );
};

export default AuthPrompt;
