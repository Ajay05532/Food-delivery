import React, { useEffect, useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../redux/hooks/useCart";
import { searchService } from "../../../services/search.service";

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
    { id: "veg", label: "Veg" },
    { id: "non-veg", label: "Non-Veg" },
    { id: "rated", label: "Rated 4+" },
    { id: "250+", label: "Rs 250+" },
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
    }, 400); // debounce time

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  };

  const handleAddToCart = (dish) => {
    addToCart({
      ...dish,
      restaurantId: dish.restaurant?._id,
      restaurantName: dish.restaurant?.name,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Tabs */}
      <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => setActiveTab("restaurants")}
          className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
            activeTab === "restaurants"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Restaurants
        </button>
        <button
          onClick={() => setActiveTab("dishes")}
          className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
            activeTab === "dishes"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Dishes
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
              selectedFilters.includes(filter.id)
                ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:border-gray-500"
            }`}
          >
            {filter.label}
            {filter.type === "dropdown" && " ▼"}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {activeTab === "dishes" &&
          dishes.map((dish) => (
            <div
              key={dish._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-md transition-all duration-300"
            >
              {/* Restaurant Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                    {dish.restaurant?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-semibold">{dish.rating}</span>
                    </div>
                    <span>•</span>
                    <span>
                      {dish.restaurant?.minDeliveryTime
                        ? `${dish.restaurant.minDeliveryTime}-${dish.restaurant.maxDeliveryTime} MINS`
                        : "30-40 MINS"}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>

              {/* Dish Details */}
              <div className="flex gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <div
                      className={`w-3.5 h-3.5 flex-shrink-0 rounded-sm border-2 flex items-center justify-center mt-0.5 ${
                        dish.isVeg
                          ? "border-green-600 dark:border-green-500"
                          : "border-red-600 dark:border-red-500"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          dish.isVeg
                            ? "bg-green-600 dark:bg-green-500"
                            : "bg-red-600 dark:bg-red-500"
                        }`}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base leading-tight">
                      {dish.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                      ₹{dish.price}
                    </span>
                    {dish.originalPrice && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        ₹{dish.originalPrice}
                      </span>
                    )}
                  </div>

                  {dish.customizable && (
                    <button className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center gap-1">
                      More Details <span>›</span>
                    </button>
                  )}
                </div>

                {/* Image and Add Button */}
                <div className="flex flex-col items-center gap-2 relative">
                  <div className="w-28 h-24 md:w-36 md:h-28 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 relative flex-shrink-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    {dish.customizable && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-[10px] py-0.5 text-center">
                        Customisable
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="absolute -bottom-2 w-20 md:w-24 py-1.5 bg-white dark:bg-gray-800 text-green-600 dark:text-green-500 font-bold text-xs md:text-sm border shadow-md border-green-600 dark:border-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors uppercase"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}

        {activeTab === "restaurants" &&
          restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/restaurant/${restaurant._id}`)}
            >
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  <img
                    src={
                      restaurant.coverImage ||
                      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop"
                    }
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                      <Star
                        size={14}
                        className="fill-green-700 text-green-700 dark:text-green-400 dark:fill-green-400"
                      />
                      <span className="font-bold text-green-700 dark:text-green-400">
                        {restaurant.avgRating || "New"}
                      </span>
                    </div>
                    <span>•</span>
                    <span>Restaurant</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
