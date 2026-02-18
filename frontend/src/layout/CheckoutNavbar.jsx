import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, ChevronDown, LogOut, Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useTheme } from "../context/ThemeContext";

const CheckoutNavbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isDarkMode, toggleTheme } = useTheme(); // Assuming toggleTheme exists, checking context...

  const handleLogout = async () => {
    try {
      // Call backend logout API to clear the cookie
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Important: Include cookies in the request
      });

      if (response.ok) {
        // Clear Redux state after successful backend logout
        dispatch(logout());
        dispatch(clearCart());
        navigate("/");
      } else {
        console.error("Logout failed");
        // Still clear Redux state even if backend fails
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Still clear Redux state even if there's an error
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <header className="w-full border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate("/")}
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
          >
            🍽️
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">
            SECURE CHECKOUT
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors text-slate-600 dark:text-gray-300"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Help
          </button>
          {isAuthenticated && user ? (
            <div className="relative group">
              <button className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 px-5 py-2.5 text-sm font-bold text-white hover:shadow-lg hover:shadow-gray-900/30 hover:from-gray-950 hover:to-gray-900 transition-all duration-300 hover:scale-105 border border-gray-700">
                <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <CircleUserRound className="h-4 w-4 text-white" />
                </div>
                <span className="hidden lg:inline">{user.name}</span>
                <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Profile Dropdown - Enhanced */}
              <div className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                <div className="px-5 py-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="py-2">
                  <button className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 hover:text-orange-600 transition-all duration-200">
                    My Orders
                  </button>
                  <button className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 hover:text-orange-600 transition-all duration-200">
                    Account Settings
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 border-t border-gray-200/50 dark:border-gray-700/50 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 px-5 py-2.5 text-sm font-bold text-white hover:shadow-lg hover:shadow-gray-900/30 hover:from-gray-950 hover:to-gray-900 transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-700"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <CircleUserRound className="h-4 w-4 text-white" />
              </div>
              <span>Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default CheckoutNavbar;
