import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, ChevronDown, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const CheckoutNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

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

  const handleSignIn = () => {
    // TODO: Implement sign in modal or navigation
    console.log("Sign in clicked");
  };

  return (
    <div>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate("/")}
              className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:bg-orange-600 transition-colors"
            >
              🍽️
            </div>
            <h1 className="text-lg font-bold text-gray-900">SECURE CHECKOUT</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors">
              Help
            </button>
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
                  <button
                    onClick={() => navigate("/order")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
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
                onClick={handleSignIn}
                className="flex w-auto items-center gap-2.5 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 text-sm font-semibold text-white hover:shadow-lg hover:from-gray-950 hover:to-gray-900 transition-all duration-200"
              >
                <CircleUserRound className="h-5 w-5 bg-orange-500 rounded-full" />
                <span>Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default CheckoutNavbar;
