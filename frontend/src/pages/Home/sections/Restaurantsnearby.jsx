import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  resetRestaurants,
} from "../../../redux/slices/restaurantSlice";
import { Star, Clock, MapPin, ChevronDown } from "lucide-react";

const RestaurantsNearby = () => {
  const [sortBy, setSortBy] = useState("relevance");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const dispatch = useDispatch();
  // Get state from Redux
  const { items, loading, hasNextPage, currentPage } = useSelector(
    (state) => state.restaurants,
  );

  // Reset and fetch restaurants on mount to ensure we show exactly 12
  useEffect(() => {
    dispatch(resetRestaurants());
    dispatch(fetchRestaurants({ page: 1, limit: 12 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      // Fetch the next page (currentPage + 1)
      dispatch(fetchRestaurants({ page: currentPage + 1, limit: 12 }));
    }
  };

  // Remove duplicates and map backend data to match frontend structure
  const restaurants = useMemo(() => {
    // Remove duplicates based on _id
    const uniqueItems = items.reduce((acc, current) => {
      const exists = acc.find((item) => item._id === current._id);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    // Map to component format
    return uniqueItems.map((restaurant) => ({
      id: restaurant._id,
      name: restaurant.name,
      image: restaurant.coverImage,
      rating: restaurant.avgRating || 0,
      time: `${restaurant.minDeliveryTime}-${restaurant.maxDeliveryTime} mins`,
      cuisine: "", // You can add this field to your backend model if needed
      location: restaurant.address
        ? `${restaurant.address.area}, ${restaurant.address.city}`
        : "",
      badge: "NEW",
      badgeColor: "bg-orange-500",
    }));
  }, [items]);

  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Delivery Time", value: "time" },
    { label: "Rating", value: "rating" },
    { label: "Nearest", value: "nearest" },
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Restaurants with online food delivery in Delhi
          </h1>

          {/* Sort Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-200 font-medium"
            >
              Sort By
              <ChevronDown size={18} />
            </button>

            {/* Dropdown Menu */}
            {showSortMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      sortBy === option.value
                        ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {restaurants.map((restaurant, index) => (
            <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
              <div
                key={restaurant.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border border-transparent dark:border-gray-700"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`,
                }}
              >
                <style>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>

                {/* Image Container with Badge */}
                <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Badge */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 ${restaurant.badgeColor} text-white py-2 px-3 text-xs font-bold`}
                  >
                    {restaurant.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Restaurant Name */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {restaurant.name}
                  </h3>

                  {/* Rating and Time */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-green-600 dark:text-green-500 fill-green-600 dark:fill-green-500"
                      />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {restaurant.rating}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        • {restaurant.time}
                      </span>
                    </div>
                  </div>

                  {/* Cuisine */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                    {restaurant.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin size={12} />
                    <span className="line-clamp-1">{restaurant.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {hasNextPage && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-500 transition-colors duration-200 bg-transparent ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Load More Restaurants"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsNearby;
