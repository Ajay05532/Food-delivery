import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice.js";
import { useAddress } from "../redux/hooks/useAddress";
import CartHover from "../components/cart/NavCartHover.jsx";
import AddressModal from "../pages/Cart/section/AddressModal.jsx";
import { useNavigate } from "react-router-dom";

import {
  CircleUserRound,
  ShoppingCart,
  Search,
  BadgeDollarSign,
  LifeBuoy,
  ChevronDown,
  LogOut,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.items);

  const { addresses, getAddresses, updateAddress } = useAddress();

  useEffect(() => {
    if (isAuthenticated) {
      getAddresses();
    }
  }, [isAuthenticated, getAddresses]);

  const address = addresses.find((addr) => addr.isDefault) || addresses[0];

  const handleAddressClick = () => {
    if (!isAuthenticated) {
      // If not logged in, prompt user to login first
      onLoginClick();
    } else {
      // If logged in, open address modal
      setIsAddressModalOpen(true);
    }
  };

  const handleSelectAddress = async (selectedAddress) => {
    // Update the selected address as default
    if (selectedAddress._id) {
      await updateAddress({ ...selectedAddress, isDefault: true });
      // Refresh addresses to get updated list
      getAddresses();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(logout());
        navigate("/");
      } else {
        console.error("Logout failed");
        dispatch(logout());
        navigate("/");
      }
    } catch (err) {
      console.error("Logout Failed: ", err);
      // Still clear Redux state even if there's an error
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <header className="w-full border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm sticky top-0 z-500 transition-colors duration-300">
      <div className="flex h-20 items-center justify-between px-8 lg:px-12 max-w-7xl mx-auto">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Utensils className="h-6 w-6" />
            </motion.div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                FoodHub
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Fast & Fresh
              </p>
            </div>
          </div>

          {/* Location Selector */}
          <button
            onClick={handleAddressClick}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 border border-transparent hover:border-orange-200 dark:hover:border-gray-700"
          >
            <span>Deliver to</span>
            <span className="font-bold text-orange-500 max-w-[200px] truncate">
              {isAuthenticated && address
                ? (address.city && address.city !== "Unknown City"
                    ? address.city
                    : "") ||
                  (address.area && address.area !== "Unknown Area"
                    ? address.area
                    : "") ||
                  address.street
                : "Others"}
            </span>
            <ChevronDown className="h-4 w-4 text-orange-500" />
          </button>
        </div>

        {/* RIGHT SECTION - Navigation */}
        <nav className="flex items-center gap-2 lg:gap-4">
          {/* Home Button */}
          <button
            className="hidden lg:flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2.5 text-sm font-bold text-white hover:shadow-lg hover:shadow-orange-500/30 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => navigate("/")}
          >
            <span>Home</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 px-3 lg:px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 group"
          >
            <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden lg:inline">Search</span>
          </button>

          {/* Offers Button */}
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 px-3 lg:px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 group relative">
            <BadgeDollarSign className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden lg:inline">Offers</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
          </button>

          {/* Help Button */}
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 group">
            <LifeBuoy className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden lg:inline">Help</span>
          </button>

          {/* Cart */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 lg:px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 transition-all duration-300">
              <div className="relative group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="h-6 w-6" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-xs font-bold text-white shadow-lg animate-pulse">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Cart</span>
            </div>
            <CartHover items={cartItems} />
          </div>

          {/* User Profile or Login Button */}
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
                  <button className="w-full text-left px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-800 hover:text-orange-600 transition-all duration-200"
                    onClick={() => navigate("/orders")}
                  >
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
        </nav>
      </div>

      {/* Address Selection Modal */}
      {isAuthenticated && (
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onSelectAddress={handleSelectAddress}
        />
      )}
    </header>
  );
};

export default Navbar;
