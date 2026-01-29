import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";

const TopRestaurants = () => {
  const scrollRef = useRef(null);

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
      name: "Faasos - Wraps, Rolls & More",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=400&h=250&fit=crop",
      rating: 4.3,
      time: "30-40 mins",
      cuisine: "Kebabs, Fast Food, Snacks",
      location: "Connaught Place",
      badge: "ITEMS AT ₹89",
      badgeColor: "bg-purple-600",
    },
    {
      id: 5,
      name: "Burger King",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop",
      rating: 4.2,
      time: "15-25 mins",
      cuisine: "Burgers, Fast Food",
      location: "Greater Kailash",
      badge: "ITEMS AT ₹99",
      badgeColor: "bg-yellow-600",
    },
  ];

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
    <div className="w-full bg-white">
      <div className="px-15 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top restaurant chains in Delhi
          </h2>
          
          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 flex items-center justify-center"
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

          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="flex-shrink-0 w-80 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image Container with Badge */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Badge */}
                <div className={`absolute bottom-0 left-0 right-0 ${restaurant.badgeColor} text-white py-2 px-3 text-sm font-bold`}>
                  {restaurant.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Restaurant Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {restaurant.name}
                </h3>

                {/* Rating and Time */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-green-600 fill-green-600" />
                    <span className="text-sm font-semibold text-gray-800">
                      {restaurant.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock size={14} />
                    <span className="text-sm font-medium">{restaurant.time}</span>
                  </div>
                </div>

                {/* Cuisine */}
                <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                  {restaurant.cuisine}
                </p>

                {/* Location */}
                <p className="text-xs font-medium text-gray-500">
                  {restaurant.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRestaurants;