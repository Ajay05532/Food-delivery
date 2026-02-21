import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../../redux/slices/userSlice";
import { ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import axios from "axios";
const Otp = ({ phone, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleResend = async () => {
    dispatch(setLoading(true));
    dispatch(setError(""));
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { phone },
        { withCredentials: true },
      );
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Failed to resend OTP"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      dispatch(setError("Enter valid 6 digit OTP"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify-otp`,
        { phone, otp },
        { withCredentials: true },
      );

      const data = res.data;

      dispatch(setUser(data.user));
      onSuccess();
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "OTP verification failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          Secure Check <ShieldCheck className="w-6 h-6 text-green-500" />
        </h2>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          We've sent a 6-digit code to <br />
          <span className="text-gray-900 dark:text-white font-bold">
            {phone}
          </span>
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-bold rounded-r-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-8 flex-1">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500" />
          <div className="relative bg-white dark:bg-gray-900 border-2 border-transparent group-focus-within:border-orange-500 rounded-2xl overflow-hidden transition-all shadow-sm">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="• • • • • •"
              className="w-full px-6 py-5 bg-transparent outline-none text-center text-4xl tracking-[1em] text-gray-900 dark:text-white font-black placeholder-gray-300 dark:placeholder-gray-700 disabled:opacity-50"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
            </>
          ) : (
            <>
              Verify & Proceed{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-dashed border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1.5">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-extrabold transition-colors active:scale-95 disabled:opacity-50"
            disabled={loading}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
