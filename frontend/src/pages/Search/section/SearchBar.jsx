import React from "react";
import { Search, X, ArrowLeft } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery, hasSearched, onBack }) => {
  const handleClear = () => {
    setSearchQuery("");
    if (onBack) onBack();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="relative">
        {hasSearched && (
          <button
            onClick={onBack}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white z-10"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <input
          type="text"
          placeholder="Search for restaurants and food"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full ${hasSearched ? "pl-12" : "pl-4"} pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 dark:text-white bg-white dark:bg-gray-800 transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
        />

        {searchQuery ? (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        ) : (
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
