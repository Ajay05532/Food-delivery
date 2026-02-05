import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthDrawer = ({ open, onClose }) => {
  const [mode, setMode] = useState("login");

  return (
    <div>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white z-[101] shadow-xl
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button - Top */}
        <button
          className="absolute top-6 left-6 text-2xl text-gray-600 hover:text-gray-900 z-10"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="h-full flex">
          {/* Left Side - Form */}
          <div className="w-[60%] p-8 overflow-y-auto flex flex-col justify-center">
            {mode === "login" ? (
              <Login
                switchToSignup={() => setMode("signup")}
                onClose={onClose}
              />
            ) : (
              <SignUp
                switchToLogin={() => setMode("login")}
                onClose={onClose}
              />
            )}
          </div>

          {/* Right Side - Image */}
          <div className="w-[40%] bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-6">
            <div className="text-center">
              {mode === "login" ? (
                <>
                  <div className="text-6xl mb-4">🍕</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Welcome Back!
                  </h3>
                  <p className="text-gray-600">Fast and Fresh Food Delivery</p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Join Us Today
                  </h3>
                  <p className="text-gray-600">Discover amazing restaurants</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDrawer;
