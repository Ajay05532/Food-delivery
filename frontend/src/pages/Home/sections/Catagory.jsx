import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Category = () => {
  const scrollRef = useRef(null);

  const items = [
    {
      id: 1,
      name: "Pizza",
      src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Burger",
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Biryani",
      src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Sushi",
      src: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Pasta",
      src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Tacos",
      src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop",
    },
    {
      id: 7,
      name: "Desserts",
      src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop",
    },
    {
      id: 8,
      name: "Salad",
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
    },
    {
      id: 9,
      name: "Chicken",
      src: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop",
    },
    {
      id: 10,
      name: "Noodles",
      src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop",
    },
    {
      id: 11,
      name: "Sandwiches",
      src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop",
    },
    {
      id: 12,
      name: "Ice Cream",
      src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ">
          <h2 className="text-xl font-bold text-gray-900">
            What's on your mind?
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
          className="flex gap-8 overflow-x-auto scroll-smooth pb-2 pt-4"
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

          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative mb-3 transition-transform duration-300 group-hover:scale-110">
                <img
                  className="w-32 h-32 rounded-full object-cover shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                />
              </div>

              {/* Text Label */}
              <p className="text-sm font-semibold text-gray-800 text-center whitespace-nowrap">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
