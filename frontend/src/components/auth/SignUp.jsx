import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../../redux/slices/userSlice";

const SignUp = ({ switchToLogin, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      dispatch(setError("All fields are required"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, role: "user" }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(setError(data.message || "Registration failed"));
        return;
      }

      // Store user data in Redux
      dispatch(setUser(data.user));
      setSuccess("Registration successful!");

      // Clear form
      setName("");
      setPhone("");
      setEmail("");

      // Close drawer after successful registration
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
        Sign Up
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-orange-600 dark:text-orange-500 font-semibold hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
        >
          Login
        </button>
      </p>

      {/* Error Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm border border-green-200 dark:border-green-800">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold transition-colors duration-200"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default SignUp;
