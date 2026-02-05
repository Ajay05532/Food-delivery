import React, { useState } from "react";
import { User } from "lucide-react";

const AuthPrompt = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLogin = () => {
    // TODO: Implement actual login logic
    setShowLoginModal(true);
    console.log("Login clicked");
  };

  const handleSignup = () => {
    // TODO: Implement actual signup logic
    setShowSignupModal(true);
    console.log("Signup clicked");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="text-gray-600" size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Account</h2>
          <p className="text-sm text-gray-600 mb-4">
            To place your order now, log in to your existing account or sign up.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleLogin}
              className="flex-1 border-2 border-teal-500 text-teal-600 font-bold py-2.5 px-6 rounded-lg hover:bg-teal-50 transition-colors"
            >
              LOG IN
            </button>
            <button
              onClick={handleSignup}
              className="flex-1 bg-teal-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-teal-600 transition-colors"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Add login modal placeholder */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Login</h3>
            <p className="text-gray-600 mb-4">
              Login functionality will be implemented here
            </p>
            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Optional: Add signup modal placeholder */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Sign Up</h3>
            <p className="text-gray-600 mb-4">
              Sign up functionality will be implemented here
            </p>
            <button
              onClick={() => setShowSignupModal(false)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPrompt;
