import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PopularCuisines = ({ onCuisineClick }) => {
  const cuisines = [
    { id: 1, name: "Pizza", emoji: "🍕" },
    { id: 2, name: "Rolls", emoji: "🌯" },
    { id: 3, name: "Burger", emoji: "🍔" },
    { id: 4, name: "Tea", emoji: "🍵" },
    { id: 5, name: "Chinese", emoji: "🥡" },
    { id: 6, name: "Cake", emoji: "🎂" },
    { id: 7, name: "Dessert", emoji: "🍰" },
    { id: 8, name: "North Indian", emoji: "🍛" },
    { id: 9, name: "South Indian", emoji: "🥘" },
    { id: 10, name: "Sandwich", emoji: "🥪" },
    { id: 11, name: "Biryani", emoji: "🍚" },
    { id: 12, name: "Noodles", emoji: "🍜" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Popular Cuisines
          </h2>
        </div>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          What are you craving today?
        </p>
      </div>

      <div
        className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-2 px-2 scroll-smooth -mx-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: "none",
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {cuisines.map((cuisine, index) => (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            key={cuisine.id}
            onClick={() => onCuisineClick(cuisine.name)}
            className="flex flex-col items-center gap-4 min-w-[90px] group relative focus:outline-none"
          >
            {/* Hover Glow Behind */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

            <div className="relative w-24 h-24 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm group-hover:border-orange-200 dark:group-hover:border-orange-500/30 group-hover:shadow-lg flex items-center justify-center text-5xl transition-all duration-300 transform group-hover:-translate-y-1 active:scale-95 z-10">
              {/* Internal gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-500/5 dark:to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                {cuisine.emoji}
              </span>
            </div>

            <span className="text-sm font-extrabold text-gray-700 dark:text-gray-300 text-center tracking-wide group-hover:text-orange-500 transition-colors">
              {cuisine.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PopularCuisines;
