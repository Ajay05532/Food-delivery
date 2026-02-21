import React, { useEffect, useState } from "react";
import { ChevronRight, Star, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../redux/hooks/useCart";
import { searchService } from "../../../services/search.service";
import { motion, AnimatePresence } from "framer-motion";

const SearchResults = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState("dishes");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);

  const filters = [
    { id: "sort", label: "Sort by", type: "dropdown" },
    { id: "fast-delivery", label: "Fast Delivery" },
    { id: "veg", label: "Veg Only" },
    { id: "non-veg", label: "Non-Veg" },
    { id: "rated", label: "Rated 4+" },
    { id: "gourmet", label: "Gourmet" },
  ];

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setRestaurants([]);
      setDishes([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchService.search(searchQuery);
        setRestaurants(data.restaurants || []);
        setDishes(data.items || []);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  };

  const handleAddToCart = (e, dish) => {
    e.stopPropagation();
    addToCart({
      ...dish,
      restaurantId: dish.restaurant?._id,
      restaurantName: dish.restaurant?.name,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Premium Tabs */}
      <div className="flex gap-4 mb-6 relative">
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-200 dark:bg-gray-800" />

        {["dishes", "restaurants"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-4 px-2 text-lg font-black tracking-wide capitalize transition-colors ${activeTab === tab ? "text-orange-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="searchTabBorder"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Glassmorphic Filters */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide pt-2">
        {filters.map((filter) => {
          const isActive = selectedFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border-2 flex items-center gap-2 shadow-sm ${isActive ? "bg-orange-50/50 border-orange-500 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-orange-200 dark:hover:border-gray-700 hover:shadow-md"}`}
            >
              {isActive && <Sparkles size={14} className="text-orange-500" />}
              {filter.label}
              {filter.type === "dropdown" && " ▼"}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-gray-100 dark:bg-gray-800 rounded-[2rem] animate-pulse border border-white/50 dark:border-white/5"
                  />
                ))
            : activeTab === "dishes"
              ? dishes.map((dish, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    key={dish._id}
                    className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-[2rem] p-5 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200 dark:hover:border-gray-700 transition-all duration-300"
                  >
                    {/* Restaurant Ref Header */}
                    <div
                      onClick={() =>
                        navigate(`/restaurant/${dish.restaurant?._id}`)
                      }
                      className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-gray-200 dark:border-gray-800 cursor-pointer"
                    >
                      <div>
                        <h3 className="font-extrabold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          {dish.restaurant?.name || "Restaurant Name"}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1.5 opacity-80">
                          <Star
                            size={12}
                            className="fill-emerald-500 text-emerald-500"
                          />
                          <span>
                            {dish.rating || "4.2"} •{" "}
                            {dish.restaurant?.minDeliveryTime || "30"}-
                            {dish.restaurant?.maxDeliveryTime || "40"} MINS
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/20 flex items-center justify-center transition-colors">
                        <ChevronRight
                          size={16}
                          className="text-gray-400 group-hover:text-orange-500"
                        />
                      </div>
                    </div>

                    {/* Dish Info */}
                    <div className="flex gap-4">
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${dish.isVeg ? "border-green-500" : "border-red-500"}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? "bg-green-500" : "bg-red-500"}`}
                            />
                          </div>
                          {dish.bestseller && (
                            <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                              Bestseller
                            </span>
                          )}
                        </div>

                        <h4 className="font-black text-lg text-gray-900 dark:text-white leading-tight mb-2">
                          {dish.name}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-black text-gray-900 dark:text-white">
                            ₹{dish.price}
                          </span>
                          {dish.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{dish.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Image & Add Button Frame */}
                      <div className="flex flex-col items-center gap-2 relative w-[130px] shrink-0">
                        <div className="w-full h-[130px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-inner group-hover:shadow-md transition-shadow relative">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="absolute -bottom-3 z-10 w-[96px] shadow-xl rounded-xl bg-white dark:bg-gray-900 overflow-hidden border border-gray-100 dark:border-gray-800 group/add">
                          <button
                            onClick={(e) => handleAddToCart(e, dish)}
                            className="w-full h-10 text-orange-600 dark:text-orange-500 font-black text-sm hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors uppercase tracking-widest active:scale-95"
                          >
                            ADD
                          </button>
                        </div>
                        {dish.customizable && (
                          <p className="text-[10px] text-gray-400 mt-4 text-center font-bold absolute -bottom-8">
                            Customizable
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              : restaurants.map((restaurant, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    key={restaurant._id}
                    onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                    className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-[2rem] p-5 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer flex gap-5 items-center"
                  >
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 relative">
                      <img
                        src={restaurant.coverImage}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                        {restaurant.name}
                      </h3>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-green-50/80 dark:bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-green-200 dark:border-emerald-800">
                          <Star
                            size={14}
                            className="fill-emerald-600 text-emerald-600 dark:text-emerald-400 dark:fill-emerald-400"
                          />
                          <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-xs">
                            {restaurant.avgRating || "New"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                          <Clock size={14} />
                          <span className="font-bold text-xs uppercase tracking-wider">
                            {restaurant.minDeliveryTime || 30} MINS
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
