import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setError, setLoading } from "../../redux/slices/userSlice";

const Otp = ({ phone, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      dispatch(setError("Enter valid 6 digit OTP"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/verify-otp",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(setError(data.message || "Invalid OTP"));
        return;
      }

      dispatch(setUser(data.user));
      onSuccess(); // close drawer / redirect
    } catch (err) {
      dispatch(setError("OTP verification failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Verify OTP</h2>
      <p className="text-sm text-gray-600 mb-6">
        OTP sent to <b>{phone}</b>
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full border px-4 py-3 rounded-lg text-center tracking-widest text-lg"
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg"
        >
          Verify OTP
        </button>
      </form>
    </>
  );
};

export default Otp;
