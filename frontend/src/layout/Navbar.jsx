import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice.js";
import CartHover from "../components/cart/NavCartHover.jsx";
import { useNavigate } from "react-router-dom";

import {
  CircleUserRound,
  ShoppingCart,
  Search,
  BadgeDollarSign,
  LifeBuoy,
  ChevronDown,
  LogOut,
} from "lucide-react";

const Navbar = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.items);

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
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-24 items-center justify-between px-12">
        <div className="flex items-center gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-base font-bold text-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            Logo
          </div>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-50">
            <span>Others</span>
            <ChevronDown className="h-4 w-4 text-orange-500" />
          </button>
        </div>

        <nav className="flex items-center gap-10">
          <button
            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-sm font-semibold text-white hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>

          <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
            <BadgeDollarSign className="h-5 w-5" />
            <span>Offers</span>
          </button>

          <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
            <LifeBuoy className="h-5 w-5" />
            <span>Help</span>
          </button>

          {/* Cart */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 px-3 py-2 rounded-lg hover:bg-gray-50">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-md">
                  {totalQuantity}
                </span>
              </div>
              <span>Cart</span>
            </div>
            <CartHover items={cartItems} />
          </div>

          {/* User Profile or Login Button */}
          {isAuthenticated && user ? (
            <div className="relative group">
              <button className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 text-sm font-semibold text-white hover:shadow-lg hover:from-gray-950 hover:to-gray-900 transition-all duration-200">
                <CircleUserRound className="h-5 w-5 bg-orange-500 rounded-full" />
                <span>{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Profile Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  My Orders
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex w-auto items-center gap-2.5 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 text-sm font-semibold text-white hover:shadow-lg hover:from-gray-950 hover:to-gray-900 transition-all duration-200"
            >
              <CircleUserRound className="h-5 w-5 bg-orange-500 rounded-full" />
              <span>Sign in</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
