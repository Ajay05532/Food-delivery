import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const AddNewUPI = ({ onBack, onVerify }) => {
  const [upiId, setUpiId] = useState("");
  const [saveVPA, setSaveVPA] = useState(true);

  // Mock checking valid format
  const isValid = upiId.includes("@");

  return (
    <div className="bg-white dark:bg-gray-900 min-h-[60vh] p-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-1 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-gray-300" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Add new UPI ID
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            1 item • Total: ₹1629
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <input
          type="text"
          placeholder="Enter your UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-4 border border-slate-200 dark:border-gray-700 rounded-lg outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-colors"
        />

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={saveVPA}
            onChange={(e) => setSaveVPA(e.target.checked)}
            className="w-5 h-5 accent-orange-500"
          />
          <span className="text-sm text-slate-600 dark:text-gray-300 font-medium">
            Save VPA for future use in Swiggy apps
          </span>
        </label>

        <button
          onClick={() => onVerify(upiId)}
          disabled={!isValid}
          className={`
            w-full py-4 rounded-lg font-bold text-lg transition-colors
            ${
              isValid
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-slate-200 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Verify and Pay
        </button>

        {/* Supported Apps Icons - simplified for now */}
        <div className="flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all dark:invert">
          <div className="flex items-center gap-1 font-bold text-slate-600 dark:text-gray-400">
            <span className="text-xl">G</span> Pay
          </div>
          <div className="flex items-center gap-1 font-bold text-slate-600 dark:text-gray-400">
            BHIM
          </div>
          <div className="flex items-center gap-1 font-bold text-slate-600 dark:text-gray-400">
            PhonePe
          </div>
          <div className="text-sm text-slate-500 dark:text-gray-500 mt-1">
            & more
          </div>
        </div>
      </div>

      {/* Connection Error Toast Simulation - can be added if needed based on screenshot */}
    </div>
  );
};

export default AddNewUPI;
