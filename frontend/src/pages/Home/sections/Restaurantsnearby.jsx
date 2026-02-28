import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  resetRestaurants,
} from "../../../redux/slices/restaurantSlice";
import { Star, Clock, MapPin, ChevronDown, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RestaurantsNearby = () => {
  const [sortBy, setSortBy] = useState("relevance");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const { items, loading, hasNextPage, currentPage } = useSelector(
    (state) => state.restaurants,
  );

  useEffect(() => {
    dispatch(resetRestaurants());
    dispatch(fetchRestaurants({ page: 1, limit: 12 }));
  }, [dispatch]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      dispatch(fetchRestaurants({ page: currentPage + 1, limit: 12 }));
    }
  };

  const restaurants = useMemo(() => {
    const uniqueItems = items.reduce((acc, current) => {
      if (!acc.find((item) => item._id === current._id)) acc.push(current);
      return acc;
    }, []);

    return uniqueItems.map((restaurant) => ({
      id: restaurant._id,
      name: restaurant.name,
      image: restaurant.coverImage,
      rating: restaurant.avgRating || 0,
      time: `${restaurant.minDeliveryTime}-${restaurant.maxDeliveryTime} mins`,
      cuisine: restaurant.cuisines
        ? restaurant.cuisines.join(", ")
        : "Multi Cuisine",
      location: restaurant.address
        ? `${restaurant.address.area}, ${restaurant.address.city}`
        : "",
      badge: "NEW",
    }));
  }, [items]);

  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Delivery Time", value: "time" },
    { label: "Rating", value: "rating" },
    { label: "Nearest", value: "nearest" },
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-[#0B0C10] min-h-screen transition-colors duration-300 relative py-12">
      {/* Glow Effects */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Restaurants Nearby
            </h1>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-500" /> Discover the best
              food near you
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-3 px-5 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 text-gray-900 dark:text-white font-bold shadow-sm"
            >
              <span className="text-gray-500 dark:text-gray-400 font-semibold">
                Sort By
              </span>
              {sortOptions.find((o) => o.value === sortBy)?.label ||
                "Relevance"}
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${showSortMenu ? "rotate-180 text-orange-500" : "text-gray-400"}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute top-full right-0 mt-3 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl z-20 overflow-hidden"
                >
                  {sortOptions.map((option) => {
                    const isActive = sortBy === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-5 py-3.5 transition-all text-sm font-bold ${isActive ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                      >
                        {option.label}
                        {isActive && (
                          <Check className="w-4 h-4" strokeWidth={3} />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {restaurants.map((restaurant, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={restaurant.id}
            >
              <Link
                to={`/restaurant/${restaurant.id}`}
                className="block relative group h-full"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-500 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition duration-500" />
                <div className="relative h-full bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800/60 shadow-md transition-all duration-300 group-hover:border-transparent flex flex-col">
                  {/* Image Area */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                    <img
                      src={
                        restaurant.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop"
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";
                      }}
                      alt={restaurant.name}
                      loading="lazy"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      {restaurant.badge}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-xl flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                        <span className="font-extrabold text-gray-900 dark:text-white text-sm">
                          {restaurant.rating}
                        </span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white flex items-center gap-1.5 font-bold text-xs border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-orange-400" />{" "}
                        {restaurant.time}
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                        {restaurant.cuisine}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 flex items-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                      <MapPin className="w-3.5 h-3.5 mr-1" />{" "}
                      {restaurant.location}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More Area */}
        {loading && (
          <div className="flex justify-center mt-12 mb-4">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          </div>
        )}

        {!loading && hasNextPage && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              className="px-8 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 tracking-wide uppercase text-sm flex items-center gap-2"
            >
              Load More Options
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsNearby;
