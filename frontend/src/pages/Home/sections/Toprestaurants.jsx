import React, { useRef, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../../redux/slices/restaurantSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TopRestaurants = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchRestaurants({ page: 1, limit: 50 }));
    }
  }, [dispatch, items.length]);

  const topRestaurants = useMemo(() => {
    const uniqueRestaurants = items.reduce((acc, current) => {
      if (!acc.find((item) => item._id === current._id)) acc.push(current);
      return acc;
    }, []);

    const sorted = uniqueRestaurants
      .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
      .slice(0, 8);

    return sorted.map((restaurant) => ({
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
      badge: "TOP RATED",
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
    <div className="w-full bg-gray-50 dark:bg-[#0B0C10] transition-colors duration-300 relative py-12">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
              <Star className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Top Restaurant Chains
              </h2>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" /> Delhi's finest
                spots
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-8 pt-4 px-2 -mx-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: "none",
          }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {loading && topRestaurants.length === 0 ? (
            // Loading Skeletons
            Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-80 h-72 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-100 dark:border-gray-800/50"
                />
              ))
          ) : topRestaurants.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12 text-gray-400 font-semibold">
              No restaurants found.
            </div>
          ) : (
            topRestaurants.map((restaurant, i) => (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={restaurant.id}
                className="flex-shrink-0 w-[300px] md:w-[340px]"
              >
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="block relative group h-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-500 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                  <div className="relative h-full bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800/60 shadow-md transition-all duration-300 group-hover:border-transparent">
                    {/* Image Area */}
                    <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
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

                      {/* Gradient Overlay for Text Visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80" />

                      {/* Badge / Info overlaid on image */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> {restaurant.badge}
                      </div>

                      {/* Floating Rating Card */}
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
                    <div className="p-5">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
                        {restaurant.cuisine}
                      </p>

                      <div className="pt-4 mt-2 border-t border-dashed border-gray-200 dark:border-gray-800 flex items-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                        <MapPin className="w-3.5 h-3.5 mr-1" />{" "}
                        {restaurant.location}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRestaurants;
