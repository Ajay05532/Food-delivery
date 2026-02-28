import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CircleUserRound,
  ChevronDown,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";

const CheckoutNavbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(logout());
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <header className="w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            <ShieldCheck className="h-6 w-6 text-white" />
          </motion.div>
          <h1 className="hidden sm:block text-xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-300">
            SECURE CHECKOUT
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button className="hidden sm:block text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Help
          </button>

          {isAuthenticated && user ? (
            <div className="relative group">
              <button className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 px-5 py-2.5 text-sm font-bold text-white hover:shadow-lg hover:shadow-gray-900/30 dark:hover:shadow-black/50 hover:from-gray-950 hover:to-gray-900 transition-all duration-300 hover:scale-105 border border-gray-700">
                <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden lg:inline">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top-right scale-95 group-hover:scale-100">
                <div className="px-5 py-4 bg-gradient-to-r from-orange-50/50 to-pink-50/50 dark:from-gray-800/50 dark:to-gray-800/50 border-b border-gray-200/50 dark:border-gray-800/50">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="py-2">
                  <button
                    className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                    onClick={() => navigate("/orders")}
                  >
                    My Orders
                  </button>
                  <button className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400 transition-all">
                    Account Settings
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 flex items-center gap-2 border-t border-gray-200/50 dark:border-gray-800/50 transition-all"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <CircleUserRound className="h-4 w-4 text-white" />
              <span>Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default CheckoutNavbar;
