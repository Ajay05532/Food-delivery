import React, { useState } from "react";
import SearchBar from "./section/SearchBar";
import PopularCuisines from "./section/PopularCuisines";
import SearchResults from "./section/SearchResults";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  const handleBack = () => {
    setHasSearched(false);
    setSearchQuery("");
  };

  const handleCuisineClick = (cuisineName) => {
    setSearchQuery(cuisineName);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
        hasSearched={hasSearched}
        onBack={handleBack}
      />

      {!hasSearched ? (
        <PopularCuisines onCuisineClick={handleCuisineClick} />
      ) : (
        <SearchResults searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default Search;
