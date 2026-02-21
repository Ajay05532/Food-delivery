import React from "react";
import { Search, X, ArrowLeft } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery, hasSearched, onBack }) => {
  const handleClear = () => {
    setSearchQuery("");
    if (onBack) onBack();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
      <div className="relative group">
        {hasSearched && (
          <button
            onClick={onBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors z-10 p-1"
          >
            <ArrowLeft size={22} className="stroke-[2.5]" />
          </button>
        )}

        {/* Ambient glow effect behind input */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />

        <input
          type="text"
          placeholder="Search for restaurants and food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`relative w-full ${hasSearched ? "pl-14" : "pl-14"} pr-14 py-4 text-base md:text-lg border-2 border-transparent bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl focus:outline-none focus:border-orange-500/50 shadow-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-bold tracking-wide transition-all`}
        />

        {!hasSearched && (
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500"
            size={22}
            strokeWidth={2.5}
          />
        )}

        {searchQuery ? (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-500/20 text-gray-500 hover:text-orange-500 rounded-full transition-colors flex items-center justify-center"
          >
            <X size={16} strokeWidth={3} />
          </button>
        ) : (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">
              Ctrl K
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
