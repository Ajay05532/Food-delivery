import React, { useState } from "react";
import { Star, Clock, MapPin, ChevronDown } from "lucide-react";

const RestaurantsNearby = () => {
  const [sortBy, setSortBy] = useState("relevance");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "Biryani House",
      image: "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=400&h=250&fit=crop",
      rating: 4.4,
      time: "20-25 mins",
      cuisine: "Biryani, Hyderabadi, Andhra",
      location: "Connaught Place",
      badge: "ITEMS AT ₹49",
      badgeColor: "bg-gray-800",
    },
    {
      id: 2,
      name: "KFC",
      image: "https://images.unsplash.com/photo-1585238341710-4dd0bd180ffd?w=400&h=250&fit=crop",
      rating: 4.5,
      time: "10-15 mins",
      cuisine: "Burgers, Fast Food, Rolls & Wraps",
      location: "Connaught Place",
      badge: "50% OFF",
      badgeColor: "bg-red-600",
    },
    {
      id: 3,
      name: "Bakingo",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=250&fit=crop",
      rating: 4.6,
      time: "35-40 mins",
      cuisine: "Bakery, Desserts, Beverages, Snacks",
      location: "Karol Bagh",
      badge: "60% OFF UPTO ₹120",
      badgeColor: "bg-pink-400",
    },
    {
      id: 4,
      name: "Rollsking",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=400&h=250&fit=crop",
      rating: 4.4,
      time: "15-20 mins",
      cuisine: "Fast Food, Rolls & Wraps, North Indian",
      location: "Connaught Place",
      badge: "SPECIAL OFFER",
      badgeColor: "bg-gray-900",
    },
    {
      id: 5,
      name: "California Burrito",
      image: "https://images.unsplash.com/photo-1565903451743-04f6461ef23e?w=400&h=250&fit=crop",
      rating: 4.7,
      time: "35-40 mins",
      cuisine: "Mexican, American, Salads, Burgers",
      location: "Karol Bagh",
      badge: "ITEMS AT ₹89",
      badgeColor: "bg-red-700",
    },
    {
      id: 6,
      name: "Taco Bell",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop",
      rating: 4.6,
      time: "15-20 mins",
      cuisine: "Mexican, Fast Food, Snacks",
      location: "Connaught Place",
      badge: "ITEMS AT ₹58",
      badgeColor: "bg-purple-900",
    },
    {
      id: 7,
      name: "Faasos - Wraps, Rolls & More",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=400&h=250&fit=crop",
      rating: 4.3,
      time: "30-40 mins",
      cuisine: "Kebabs, Fast Food, Snacks, North Indian",
      location: "Connaught Place",
      badge: "ITEMS AT ₹89",
      badgeColor: "bg-purple-600",
    },
    {
      id: 8,
      name: "Domino's Pizza",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400&h=250&fit=crop",
      rating: 4.4,
      time: "20-25 mins",
      cuisine: "Pizzas, Italian, Pastas, Desserts",
      location: "Connaught Place",
      badge: "50% OFF",
      badgeColor: "bg-blue-600",
    },
    {
      id: 9,
      name: "Burger King",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop",
      rating: 4.2,
      time: "15-25 mins",
      cuisine: "Burgers, Fast Food, Beverages",
      location: "Greater Kailash",
      badge: "ITEMS AT ₹99",
      badgeColor: "bg-yellow-600",
    },
    {
      id: 10,
      name: "Mainland China",
      image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b5?w=400&h=250&fit=crop",
      rating: 4.5,
      time: "25-30 mins",
      cuisine: "Chinese, Asian, Continental",
      location: "Karol Bagh",
      badge: "FREE DELIVERY",
      badgeColor: "bg-green-600",
    },
    {
      id: 11,
      name: "Biryani by Kilo",
      image: "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=400&h=250&fit=crop",
      rating: 4.6,
      time: "30-35 mins",
      cuisine: "Biryani, Hyderabadi, Kabab",
      location: "CP Block",
      badge: "ITEMS AT ₹79",
      badgeColor: "bg-orange-700",
    },
    {
      id: 12,
      name: "Wow! Momo",
      image: "https://images.unsplash.com/photo-1585238341710-4dd0bd180ffd?w=400&h=250&fit=crop",
      rating: 4.4,
      time: "20-25 mins",
      cuisine: "Momos, Asian, Chinese, Tibetan",
      location: "Connaught Place",
      badge: "40% OFF",
      badgeColor: "bg-indigo-600",
    },
  ];

  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Delivery Time", value: "time" },
    { label: "Rating", value: "rating" },
    { label: "Nearest", value: "nearest" },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-15 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Restaurants with online food delivery in Delhi
          </h1>

          {/* Sort Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-gray-700 font-medium"
            >
              Sort By
              <ChevronDown size={18} />
            </button>

            {/* Dropdown Menu */}
            {showSortMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors ${
                      sortBy === option.value ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700"
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
            <div
              key={restaurant.id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
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
              <div className="relative h-40 overflow-hidden bg-gray-200">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Badge */}
                <div className={`absolute bottom-0 left-0 right-0 ${restaurant.badgeColor} text-white py-2 px-3 text-xs font-bold`}>
                  {restaurant.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                {/* Restaurant Name */}
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">
                  {restaurant.name}
                </h3>

                {/* Rating and Time */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-green-600 fill-green-600" />
                    <span className="text-sm font-semibold text-gray-800">
                      {restaurant.rating}
                    </span>
                    <span className="text-xs text-gray-600">
                      • {restaurant.time}
                    </span>
                  </div>
                </div>

                {/* Cuisine */}
                <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                  {restaurant.cuisine}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={12} />
                  <span className="line-clamp-1">{restaurant.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors duration-200">
            Load More Restaurants
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsNearby;