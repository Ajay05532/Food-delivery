import React, { useState } from "react";
import { Search, ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../redux/hooks/useCart";
import RestaurantSwitchModal from "../../../components/RestaurantSwitchModal";
import ScrollReveal from "../../../components/ScrollReveal";

const Menu = ({
  restaurantId = "",
  restaurantName = "",
  menuItems = [], // Menu items from backend
}) => {
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
    clearCart,
    restaurantId: cartRestaurantId,
    restaurantName: cartRestaurantName,
  } = useCart();

  // Organize menu items by category
  const organizeMenuByCategory = () => {
    if (!menuItems || menuItems.length === 0) {
      return { categories: [], itemsByCategory: {} };
    }

    const itemsByCategory = {};
    const categoryNames = new Set();

    menuItems.forEach((item) => {
      const category = item.category || "Uncategorized";
      categoryNames.add(category);

      if (!itemsByCategory[category]) {
        itemsByCategory[category] = [];
      }

      // Add item with proper structure
      itemsByCategory[category].push({
        _id: item._id,
        id: item._id, // Use _id as id for cart functionality
        name: item.name,
        type: item.isVeg === true ? "veg" : "non-veg", // Map isVeg boolean to type string
        category: category,
        price: item.price,
        description: item.description,
        image:
          item.image ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
        isAvailable: item.isAvailable !== false,
        // Optional fields
        originalPrice: item.originalPrice,
        discount: item.discount,
        rating: item.rating,
        ratingCount: item.ratingCount,
        badge: item.badge,
      });
    });

    const categories = Array.from(categoryNames).map((name, index) => ({
      id: index,
      name: name,
      items: itemsByCategory[name].length,
    }));

    return { categories, itemsByCategory };
  };

  const { categories, itemsByCategory } = organizeMenuByCategory();

  const filters = [
    { id: "veg", label: "Veg", icon: "🟢" },
    { id: "non-veg", label: "Non-Veg", icon: "🔴" },
  ];

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  };

  const handleAddToCart = (item) => {
    const result = addToCart({
      ...item,
      restaurantId,
      restaurantName,
      image: item.image,
    });

    // If error, show modal
    if (result && !result.success) {
      setPendingItem(item);
      setShowSwitchModal(true);
    }
  };

  const handleIncreaseQuantity = (item) => {
    const currentQty = getItemQuantity(item.id);
    updateQuantity(item.id, currentQty + 1);
  };

  const handleDecreaseQuantity = (item) => {
    const currentQty = getItemQuantity(item.id);
    if (currentQty > 1) {
      updateQuantity(item.id, currentQty - 1);
    } else {
      removeItem(item.id);
    }
  };

  const getFilteredItems = (category) => {
    const categoryName = category.name;
    const allItems = itemsByCategory[categoryName] || [];
    return allItems.filter((item) => selectedFilters.includes(item.type));
  };

  const getItemQuantity = (itemId) => {
    // Only show quantity if the cart is from the current restaurant
    if (cartRestaurantId !== restaurantId) {
      return 0;
    }
    const item = items.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 mb-4">
        <h1 className="text-center text-gray-600 dark:text-gray-400 text-sm tracking-widest mb-8">
          ~ MENU ~
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for dishes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-800 rounded-full focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          />
          <Search
            className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400"
            size={20}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 items-center flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 transition-colors ${
                selectedFilters.includes(filter.id)
                  ? "bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white"
                  : "bg-orange-200 dark:bg-orange-900/30 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              <span className="text-base md:text-lg">{filter.icon}</span>
              <span className="text-xs md:text-sm font-medium">
                {filter.label}
              </span>
            </button>
          ))}
          <button className="px-3 py-1.5 md:px-4 md:py-2 border-2 border-gray-300 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-300 text-xs md:text-sm font-medium hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
            Bestseller
          </button>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No menu items available
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              This restaurant hasn't added their menu yet
            </p>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const filteredItems = getFilteredItems(category);
            if (filteredItems.length === 0) return null;

            return (
              <div
                key={category.id}
                className="border-b border-gray-200 dark:border-gray-800 pb-6"
              >
                {/* Category Header */}
                <div
                  className="flex items-center justify-between cursor-pointer mb-4 hover:opacity-80 transition-opacity"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id,
                    )
                  }
                >
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.name} ({category.items})
                  </h2>
                  {expandedCategory === category.id ? (
                    <ChevronUp
                      size={20}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  )}
                </div>

                {/* Items */}
                {expandedCategory === category.id && (
                  <div className="space-y-4">
                    {filteredItems.map((item, index) => {
                      const quantity = getItemQuantity(item.id);

                      return (
                        <ScrollReveal
                          key={item.id}
                          variant="slideIn"
                          delay={index * 0.05}
                          className="flex gap-3 md:gap-4 pb-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
                        >
                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            {/* Type Indicator */}
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                                  item.type === "veg"
                                    ? "border-green-600 dark:border-green-500"
                                    : "border-red-600 dark:border-red-500"
                                }`}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    item.type === "veg"
                                      ? "bg-green-600 dark:bg-green-500"
                                      : "bg-red-600 dark:bg-red-500"
                                  }`}
                                />
                              </div>
                              {item.badge && (
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                                  <span>⭐</span> {item.badge}
                                </span>
                              )}
                            </div>

                            {/* Item Name */}
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">
                              {item.name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                                ₹{item.price}
                              </span>
                              {item.originalPrice && (
                                <>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                  <span className="text-xs font-bold text-green-600 dark:text-green-500">
                                    {item.discount}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Rating */}
                            {item.rating && (
                              <div className="flex items-center gap-1 text-xs md:text-sm mb-1">
                                <span className="text-yellow-500">⭐</span>
                                <span className="font-bold text-gray-900 dark:text-gray-100">
                                  {item.rating}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  ({item.ratingCount})
                                </span>
                              </div>
                            )}

                            {/* Description (Truncated) */}
                            {item.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                {item.description}
                              </p>
                            )}

                            {/* More Details Link */}
                            {(item.originalPrice || item.customizable) && (
                              <button className="text-gray-600 dark:text-gray-400 text-xs font-semibold mt-2 flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                                More Details <span>&gt;</span>
                              </button>
                            )}
                          </div>

                          {/* Item Image and Add Button */}
                          <div className="flex flex-col items-center gap-2 relative">
                            <div className="w-28 h-24 md:w-32 md:h-28 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="-mt-6 shadow-lg rounded-lg bg-white dark:bg-gray-900 z-10 w-24 md:w-28 flex justify-center">
                              {quantity > 0 ? (
                                <div className="flex items-center justify-between w-full bg-green-50 dark:bg-green-900/20 rounded-lg px-2 py-1.5 border border-green-600 dark:border-green-500">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDecreaseQuantity(item);
                                    }}
                                    className="text-green-600 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/40 rounded transition-colors"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="text-sm font-bold text-green-600 dark:text-green-500 text-center">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleIncreaseQuantity(item);
                                    }}
                                    className="text-green-600 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/40 rounded transition-colors"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(item);
                                  }}
                                  className="w-full px-4 py-1.5 text-green-600 dark:text-green-500 font-bold text-sm border border-green-600 dark:border-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors bg-white dark:bg-gray-800 uppercase"
                                >
                                  ADD
                                </button>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Footer */}
      {totalQuantity > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent pointer-events-none z-50">
          <div className="max-w-6xl mx-auto pointer-events-auto">
            <div className="bg-green-600 text-white px-4 py-3 md:py-4 flex items-center justify-between shadow-2xl rounded-lg transform transition-transform duration-300 hover:scale-[1.01]">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="font-bold text-sm md:text-base">
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"} | ₹
                  {totalPrice}
                </div>
                <div className="text-xs text-green-100 md:ml-2">
                  Extra charges may apply
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="flex items-center gap-2 font-bold text-sm md:text-base hover:text-green-100 transition-colors group"
              >
                VIEW CART
                <span className="text-lg group-hover:translate-x-1 transition-transform">
                  🛒
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Switch Modal */}
      <RestaurantSwitchModal
        isOpen={showSwitchModal}
        currentRestaurant={cartRestaurantName}
        newRestaurant={restaurantName}
        onClose={() => {
          setShowSwitchModal(false);
          setPendingItem(null);
        }}
        onClearAndAdd={() => {
          if (pendingItem) {
            // Clear cart and add the new item
            clearCart();
            handleAddToCart(pendingItem);
          }
          setShowSwitchModal(false);
          setPendingItem(null);
        }}
      />
    </div>
  );
};

export default Menu;
