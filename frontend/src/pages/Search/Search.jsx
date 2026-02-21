import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./section/SearchBar";
import PopularCuisines from "./section/PopularCuisines";
import SearchResults from "./section/SearchResults";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setHasSearched(true);
      setSearchParams({ q: query });
    } else {
      setHasSearched(false);
      setSearchParams({});
    }
  };

  const handleBack = () => {
    setHasSearched(false);
    setSearchQuery("");
    setSearchParams({});
  };

  const handleCuisineClick = (cuisineName) => {
    setSearchQuery(cuisineName);
    setHasSearched(true);
    setSearchParams({ q: cuisineName });
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
