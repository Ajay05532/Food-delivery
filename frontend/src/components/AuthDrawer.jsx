import React from "react";

const AuthDrawer = ({ open, onClose }) => {
  return (
    <div>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[100]
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-xl z-[101]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6">
          {/* Close Button */}
          <button className="text-gray-700 text-xl mb-4" onClick={onClose}>
            ×
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-1">Sign In</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your details to continue
          </p>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Phone number"
              className="w-full border px-4 py-3 rounded-lg outline-none 
              focus:ring-2 focus:ring-orange-600"
            />

            <input
              type="text"
              placeholder="Name"
              className="w-full border px-4 py-3 rounded-lg outline-none 
              focus:ring-2 focus:ring-orange-600"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-3 rounded-lg outline-none 
              focus:ring-2 focus:ring-orange-600"
            />

            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg
              hover:bg-orange-700 transition-all"
            >
              Continue
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4">
            By signing in, you accept our Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthDrawer;
