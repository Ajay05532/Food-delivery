import React, { useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../../redux/slices/restaurantSlice";
import { Link } from "react-router-dom";

const TopRestaurants = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.restaurants);

  // Fetch restaurants on mount if not already loaded
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchRestaurants({ page: 1, limit: 50 })); // Fetch more items to get top 10
    }
  }, [dispatch, items.length]);

  // Get top 10 restaurants sorted by rating
  const topRestaurants = useMemo(() => {
    // Remove duplicates based on _id
    const uniqueRestaurants = items.reduce((acc, current) => {
      const exists = acc.find((item) => item._id === current._id);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    // Sort by rating (descending) and take top 10
    const sorted = uniqueRestaurants
      .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
      .slice(0, 8);

    // Map to component format
    return sorted.map((restaurant) => ({
      id: restaurant._id,
      name: restaurant.name,
      image: restaurant.coverImage,
      rating: restaurant.avgRating || 0,
      time: `${restaurant.minDeliveryTime}-${restaurant.maxDeliveryTime} mins`,
      cuisine: "", // You can add cuisine field to backend model
      location: restaurant.address
        ? `${restaurant.address.area}, ${restaurant.address.city}`
        : "",
      badge: "TOP RATED",
      badgeColor: "bg-orange-500",
    }));
  }, [items]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Top restaurant chains in Delhi
          </h2>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200 flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200 flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: "none",
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {loading && topRestaurants.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12">
              <div className="text-gray-500 dark:text-gray-400">
                Loading top restaurants...
              </div>
            </div>
          ) : topRestaurants.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12">
              <div className="text-gray-500 dark:text-gray-400">
                No restaurants available
              </div>
            </div>
          ) : (
            topRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="flex-shrink-0 w-80 rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-transparent dark:border-gray-700"
              >
                {/* Image Container with Badge */}
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Badge */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 ${restaurant.badgeColor} text-white py-2 px-3 text-sm font-bold`}
                  >
                    {restaurant.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Restaurant Name */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {restaurant.name}
                  </h3>

                  {/* Rating and Time */}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-green-600 dark:text-green-500 fill-green-600 dark:fill-green-500"
                      />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {restaurant.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Clock size={14} />
                      <span className="text-sm font-medium">
                        {restaurant.time}
                      </span>
                    </div>
                  </div>

                  {/* Cuisine */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                    {restaurant.cuisine}
                  </p>

                  {/* Location */}
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {restaurant.location}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRestaurants;
