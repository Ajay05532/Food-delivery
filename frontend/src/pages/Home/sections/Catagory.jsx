import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Category = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

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
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/search?q=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              What's on your mind?
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-orange-500/20 hover:border-orange-500 dark:hover:border-orange-500 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-all active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-orange-500/20 hover:border-orange-500 dark:hover:border-orange-500 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-all active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-4 pt-2 px-2 -mx-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: "none",
          }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              key={item.id}
              onClick={() => handleCategoryClick(item.name)}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative mb-4">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 blur-sm" />
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-gray-200 dark:from-gray-800 dark:to-gray-800 group-hover:from-orange-400 group-hover:via-pink-500 group-hover:to-purple-500 transition-colors duration-300 relative z-10">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Text Label */}
              <p className="text-base font-bold text-gray-800 dark:text-gray-200 text-center whitespace-nowrap group-hover:text-orange-500 transition-colors">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
