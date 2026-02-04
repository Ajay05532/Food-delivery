import React, { useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../redux/hooks/useCart";

const SearchResults = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState("dishes");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const filters = [
    { id: "sort", label: "Sort by", type: "dropdown" },
    { id: "fast-delivery", label: "Fast Delivery" },
    { id: "veg", label: "Veg" },
    { id: "non-veg", label: "Non-Veg" },
    { id: "rated", label: "Rated 4+" },
    { id: "250+", label: "Rs 250+" },
    { id: "100-250", label: "Rs 100-Rs 250" },
    { id: "gourmet", label: "Gourmet" },
    { id: "guiltfree", label: "Guiltfree" },
  ];

  const mockDishes = [
    {
      id: 1,
      name: "Chicken Hyderabadi Dum Biryani [1/2 Kg]. Serves 1-2",
      price: 469,
      restaurantName: "By Biryani By Kilo",
      rating: 4.3,
      deliveryTime: "30-40 MINS",
      image:
        "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=300&h=200&fit=crop",
      type: "non-veg",
      customizable: true,
      restaurantId: "restaurant-1",
    },
    {
      id: 2,
      name: "Veg Dum Biryani Bowl - 500ml",
      price: 229,
      originalPrice: 269,
      restaurantName: "By Bikkgane Biryani",
      rating: 4.4,
      deliveryTime: "20-25 MINS",
      image:
        "https://images.unsplash.com/photo-1612874742237-415221591328?w=300&h=200&fit=crop",
      type: "veg",
      restaurantId: "restaurant-2",
    },
    {
      id: 3,
      name: "Half Veg Dum Biryani",
      price: 189,
      restaurantName: "By Dum Safar Biryani",
      rating: 4.4,
      deliveryTime: "20-25 MINS",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=300&h=200&fit=crop",
      type: "veg",
      restaurantId: "restaurant-3",
    },
    {
      id: 4,
      name: "Double Chicken Dum Hyderabadi Biryani",
      price: 469,
      restaurantName: "By Bikkgane Biryani",
      rating: 4.4,
      deliveryTime: "20-25 MINS",
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop",
      type: "non-veg",
      restaurantId: "restaurant-2",
    },
  ];

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
      restaurantId: dish.restaurantId,
      restaurantName: dish.restaurantName,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setActiveTab("restaurants")}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === "restaurants"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Restaurants
        </button>
        <button
          onClick={() => setActiveTab("dishes")}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === "dishes"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {filter.label}
            {filter.type === "dropdown" && " ▼"}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {mockDishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {/* Restaurant Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {dish.restaurantName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="font-semibold">{dish.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{dish.deliveryTime}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            {/* Dish Details */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <div
                    className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center mt-0.5 ${
                      dish.type === "veg"
                        ? "border-green-600"
                        : "border-red-600"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        dish.type === "veg" ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {dish.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900">₹{dish.price}</span>
                  {dish.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{dish.originalPrice}
                    </span>
                  )}
                </div>

                {dish.customizable && (
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    More Details <span>›</span>
                  </button>
                )}
              </div>

              {/* Image and Add Button */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-36 h-28 rounded-lg overflow-hidden bg-gray-200 relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  {dish.customizable && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                      Customisable
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(dish)}
                  className="px-8 py-2 bg-white text-green-600 font-bold text-sm border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
