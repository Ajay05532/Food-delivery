import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const AddNewCard = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    validThrough: "",
    cvv: "",
    nameOnCard: "",
    nickname: "",
    secureCard: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
            Add New Card
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            1 item • Total: ₹1629
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full p-4 border border-slate-200 dark:border-gray-700 rounded-lg outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-colors"
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="validThrough"
            placeholder="Valid Through (MM/YY)"
            value={formData.validThrough}
            onChange={handleChange}
            className="flex-[2] p-4 border border-slate-200 dark:border-gray-700 rounded-lg outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-colors"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            maxLength="3"
            className="flex-1 p-4 border border-slate-200 dark:border-gray-700 rounded-lg outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-colors"
          />
        </div>

        <input
          type="text"
          name="nameOnCard"
          placeholder="Name on Card"
          value={formData.nameOnCard}
          onChange={handleChange}
          className="w-full p-4 border border-slate-200 dark:border-gray-700 rounded-lg outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-colors"
        />

        <input
          type="text"
          name="nickname"
          placeholder="Card Nickname (for easy identification)"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full p-4 border border-slate-200 dark:border-gray-700 rounded-lg outline-none focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-colors"
        />

        <label className="flex items-center gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            name="secureCard"
            checked={formData.secureCard}
            onChange={handleChange}
            className="w-5 h-5 accent-orange-500"
          />
          <span className="text-sm text-slate-600 dark:text-gray-300">
            Secure this card.{" "}
            <span className="font-bold underline">Why is it important?</span>
          </span>
        </label>

        <div className="pt-8">
          <button
            onClick={() => onSave(formData)}
            className="w-full bg-slate-200 hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-700 dark:text-white font-bold py-4 rounded-lg transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCard;
