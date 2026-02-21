import React, { useState } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  Star,
  Info,
  Crown,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../redux/hooks/useCart";
import RestaurantSwitchModal from "../../../components/RestaurantSwitchModal";
import ScrollReveal from "../../../components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const Menu = ({ restaurantId = "", restaurantName = "", menuItems = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(["veg", "non-veg"]);
  const [expandedCategory, setExpandedCategory] = useState(0);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const navigate = useNavigate();
  const {
    items,
    totalQuantity,
    totalPrice,
    addToCart,
    updateQuantity,
    removeItem,
    clearCartAndAddItem,
    restaurantId: cartRestaurantId,
    restaurantName: cartRestaurantName,
  } = useCart();

  const organizeMenuByCategory = () => {
    if (!menuItems || menuItems.length === 0)
      return { categories: [], itemsByCategory: {} };
    const itemsByCategory = {};
    const categoryNames = new Set();
    menuItems.forEach((item) => {
      const category = item.category || "Uncategorized";
      categoryNames.add(category);
      if (!itemsByCategory[category]) itemsByCategory[category] = [];
      itemsByCategory[category].push({
        _id: item._id,
        id: item._id,
        name: item.name,
        type: item.isVeg === true ? "veg" : "non-veg",
        category,
        price: item.price,
        description: item.description,
        image:
          item.image ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
        isAvailable: item.isAvailable !== false,
        originalPrice: item.originalPrice,
        discount: item.discount,
        rating: item.rating,
        ratingCount: item.ratingCount,
        badge: item.badge,
      });
    });
    const categories = Array.from(categoryNames).map((name, index) => ({
      id: index,
      name,
      items: itemsByCategory[name].length,
    }));
    return { categories, itemsByCategory };
  };

  const { categories, itemsByCategory } = organizeMenuByCategory();
  const filters = [
    { id: "veg", label: "Pure Veg", icon: "🟢" },
    { id: "non-veg", label: "Non-Veg", icon: "🔴" },
  ];

  const toggleFilter = (filterId) =>
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  const handleAddToCart = (item) => {
    const result = addToCart({
      ...item,
      restaurantId,
      restaurantName,
      image: item.image,
    });
    if (result && !result.success) {
      setPendingItem(item);
      setShowSwitchModal(true);
    }
  };
  const handleIncreaseQuantity = (item) =>
    updateQuantity(item.id, getItemQuantity(item.id) + 1);
  const handleDecreaseQuantity = (item) => {
    const currentQty = getItemQuantity(item.id);
    if (currentQty > 1) updateQuantity(item.id, currentQty - 1);
    else removeItem(item.id);
  };
  const getItemQuantity = (itemId) =>
    cartRestaurantId !== restaurantId
      ? 0
      : items.find((i) => i.id === itemId)?.quantity || 0;

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950 min-h-screen transition-colors duration-300 xl:px-8">
      {/* Filters and Search Bar (Sticky) */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {filters.map((filter) => {
              const isActive = selectedFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-300 ${isActive ? (filter.id === "veg" ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-red-50 border-red-500 text-red-700 dark:bg-red-500/10 dark:text-red-400") : "bg-transparent border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700"}`}
                >
                  <span className="text-xs">{filter.icon}</span> {filter.label}
                </button>
              );
            })}
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1 shrink-0" />
            <button className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors">
              <Flame className="w-4 h-4 text-orange-500" /> Bestsellers
            </button>
          </div>

          <div className="relative w-full md:max-w-xs group">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-orange-500 rounded-xl outline-none text-sm font-semibold text-gray-900 dark:text-white transition-all shadow-inner"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
        </div>
      </div>

      {/* Menu Area */}
      <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => {
              const filteredItems = (
                itemsByCategory[category.name] || []
              ).filter(
                (item) =>
                  selectedFilters.includes(item.type) &&
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()),
              );
              if (filteredItems.length === 0) return null;

              const isExpanded = expandedCategory === category.id;

              return (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() =>
                      setExpandedCategory(isExpanded ? null : category.id)
                    }
                    className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-500 flex items-center justify-center font-black">
                        {category.items}
                      </div>
                      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                        {category.name}
                      </h2>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  {/* Items Grid */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 dark:bg-gray-900/50"
                      >
                        {filteredItems.map((item, index) => {
                          const quantity = getItemQuantity(item.id);
                          return (
                            <ScrollReveal
                              key={item.id}
                              variant="slideIn"
                              delay={index * 0.05}
                            >
                              <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-transparent hover:border-orange-200 dark:hover:border-gray-700 shadow-sm transition-all group">
                                {/* Info Box */}
                                <div className="flex-1 min-w-0 pr-2">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div
                                      className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center shrink-0 ${item.type === "veg" ? "border-green-600 dark:border-green-500" : "border-red-600 dark:border-red-500"}`}
                                    >
                                      <div
                                        className={`w-1.5 h-1.5 rounded-full ${item.type === "veg" ? "bg-green-600 dark:bg-green-500" : "bg-red-600 dark:bg-red-500"}`}
                                      />
                                    </div>
                                    {item.badge && (
                                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                        <Crown className="w-3 h-3" />{" "}
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight mb-1 group-hover:text-orange-500 transition-colors">
                                    {item.name}
                                  </h3>

                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-extrabold text-gray-900 dark:text-white text-base">
                                      ₹{item.price}
                                    </span>
                                    {item.originalPrice && (
                                      <span className="text-xs text-gray-400 line-through font-medium">
                                        ₹{item.originalPrice}
                                      </span>
                                    )}
                                  </div>

                                  {item.rating && (
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <div className="flex items-center gap-0.5 bg-green-700 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                        <Star className="w-3 h-3 fill-white" />{" "}
                                        {item.rating}
                                      </div>
                                      <span className="text-[11px] text-gray-500 font-medium">
                                        ({item.ratingCount})
                                      </span>
                                    </div>
                                  )}

                                  {item.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                                      {item.description}
                                    </p>
                                  )}
                                </div>

                                {/* Image Box */}
                                <div className="flex flex-col items-center shrink-0 w-[118px]">
                                  <div className="w-[118px] h-[118px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-inner relative group-hover:shadow-md transition-shadow cursor-pointer">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>

                                  <div className="-mt-5 z-10 w-[96px] shadow-xl rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden relative">
                                    {quantity > 0 ? (
                                      <div className="flex items-center justify-between w-full h-10 bg-green-50/80 dark:bg-green-500/10 backdrop-blur-md px-1 select-none">
                                        <button
                                          onClick={() =>
                                            handleDecreaseQuantity(item)
                                          }
                                          className="w-8 h-8 flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors font-bold text-lg"
                                        >
                                          <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-black text-green-700 dark:text-green-400">
                                          {quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleIncreaseQuantity(item)
                                          }
                                          className="w-8 h-8 flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors font-bold text-lg"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full h-10 text-orange-600 dark:text-orange-500 font-black text-sm hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors uppercase tracking-widest relative overflow-hidden active:scale-95 group/btn"
                                      >
                                        <span className="relative z-10">
                                          ADD
                                        </span>
                                      </button>
                                    )}
                                  </div>
                                  {item.customizable && (
                                    <p className="text-[10px] text-gray-400 mt-2 text-center font-medium">
                                      Customizable
                                    </p>
                                  )}
                                </div>
                              </div>
                            </ScrollReveal>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Cart Footer */}
      <AnimatePresence>
        {totalQuantity > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 md:p-6 pb-6 md:pb-8 z-50 pointer-events-none flex justify-center"
          >
            <div className="max-w-2xl w-full pointer-events-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-1 shadow-2xl shadow-orange-500/30">
              <div className="bg-gray-900/40 backdrop-blur-xl w-full h-full rounded-xl flex items-center justify-between px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg md:text-xl drop-shadow-md">
                    {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}{" "}
                    <span className="mx-2 opacity-50">|</span> ₹{totalPrice}
                  </span>
                  <span className="text-orange-200 text-xs font-semibold uppercase tracking-wider mt-0.5">
                    Extra charges may apply
                  </span>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-white text-gray-900 hover:bg-orange-50 px-6 py-3 rounded-xl font-black text-sm md:text-base flex items-center gap-2 transition-transform active:scale-95 shadow-xl"
                >
                  VIEW CART <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RestaurantSwitchModal
        isOpen={showSwitchModal}
        currentRestaurant={cartRestaurantName}
        newRestaurant={restaurantName}
        onClose={() => {
          setShowSwitchModal(false);
          setPendingItem(null);
        }}
        onClearAndAdd={() => {
          if (pendingItem)
            clearCartAndAddItem({
              ...pendingItem,
              restaurantId,
              restaurantName,
              image: pendingItem.image,
            });
          setShowSwitchModal(false);
          setPendingItem(null);
        }}
      />
    </div>
  );
};

export default Menu;
