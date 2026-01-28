import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Chole from "../assets/Chole_Bhature.jpg";
import Dosa from "../assets/Dosa.jpeg";
import Samosa from "../assets/Samosa.jpeg";

const Category = () => {
  const scrollRef = useRef(null);

  const items = [
    { id: 1, name: "Dosa", src: Dosa },
    { id: 2, name: "Chole Bhature", src: Chole },
    { id: 3, name: "Samosa", src: Samosa },
  ];

  // Repeat items for continuous scrolling effect
  const displayItems = Array(6).fill(items).flat();

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
      <div className="px-20 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ">
          <h2 className="text-xl font-bold text-gray-900">Popular Category</h2>
          
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
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 pt-4"
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

          {displayItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative mb-3 transition-transform duration-200 group-hover:scale-110">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 p-1 bg-white shadow-sm"
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                />
              </div>
              
              {/* Text Label */}
              <p className="text-sm font-medium text-gray-800 text-center whitespace-nowrap">
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