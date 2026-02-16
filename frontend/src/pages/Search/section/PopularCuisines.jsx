import React from "react";

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Popular Cuisines
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.id}
            onClick={() => onCuisineClick(cuisine.name)}
            className="flex flex-col items-center gap-2 min-w-[80px] group"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl group-hover:bg-orange-50 dark:group-hover:bg-gray-700 transition-colors shadow-sm">
              {cuisine.emoji}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              {cuisine.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularCuisines;
