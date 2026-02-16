import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setError } from "../../redux/slices/userSlice";

const Login = ({ switchToSignup, onClose }) => {
  const [phone, setPhone] = useState("9162384894");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!phone.trim()) {
      dispatch(setError("Phone number is required"));
      return;
    }

    if (phone.trim().length < 10) {
      dispatch(setError("Please enter a valid phone number"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(setError(data.message || "Login failed"));
        return;
      }

      // Store user data in Redux
      dispatch(setUser(data.user));
      setSuccess("Login successful! Redirecting...");

      // Clear form
      setPhone("");

      // Close the drawer after showing success message
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 1000);
    } catch (err) {
      dispatch(setError("Something went wrong. Please try again."));
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Login
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Don't have an account?{" "}
        <button
          onClick={switchToSignup}
          className="text-orange-600 dark:text-orange-500 font-semibold hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
        >
          Create one
        </button>
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm border border-green-200 dark:border-green-800">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold transition-colors duration-200 disabled:bg-orange-400 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By clicking on Login, I accept the{" "}
          <span className="text-gray-700 dark:text-gray-300 font-semibold cursor-pointer hover:underline">
            Terms & Conditions & Privacy Policy
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
