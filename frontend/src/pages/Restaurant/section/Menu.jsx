import React, { useState } from "react";
import { Search, ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../redux/hooks/useCart";
import RestaurantSwitchModal from "../../../components/RestaurantSwitchModal";

const Menu = ({
  restaurantId = "65d8b1b1b1b1b1b1b1b10001",
  restaurantName = "Punjabi Angithi By Vegorama Group",
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
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 mb-4">
        <h1 className="text-center text-gray-600 text-sm tracking-widest mb-8">
          ~ MENU ~
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for dishes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-200 rounded-full focus:outline-none focus:bg-gray-100 text-gray-700"
          />
          <Search
            className="absolute right-4 top-3.5 text-gray-500"
            size={20}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 items-center flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${
                selectedFilters.includes(filter.id)
                  ? "bg-white border-gray-400 text-gray-900"
                  : "bg-orange-200 border-gray-300 text-gray-600"
              }`}
            >
              <span className="text-lg">{filter.icon}</span>
              <span className="text-sm font-medium">{filter.label}</span>
            </button>
          ))}
          <button className="px-4 py-2 border-2 border-gray-300 rounded-full text-gray-600 text-sm font-medium hover:border-gray-400">
            Bestseller
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              No menu items available
            </p>
            <p className="text-gray-400 text-sm">
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
              <div key={category.id} className="border-b border-gray-200 pb-6">
                {/* Category Header */}
                <div
                  className="flex items-center justify-between cursor-pointer mb-4 hover:opacity-80 transition-opacity"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id,
                    )
                  }
                >
                  <h2 className="text-lg font-bold text-gray-900">
                    {category.name} ({category.items})
                  </h2>
                  {expandedCategory === category.id ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </div>

                {/* Items */}
                {expandedCategory === category.id && (
                  <div className="space-y-4">
                    {filteredItems.map((item) => {
                      const quantity = getItemQuantity(item.id);

                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        >
                          {/* Item Details */}
                          <div className="flex-1">
                            {/* Type Indicator */}
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                                  item.type === "veg"
                                    ? "border-green-600"
                                    : "border-red-600"
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    item.type === "veg"
                                      ? "bg-green-600"
                                      : "bg-red-600"
                                  }`}
                                />
                              </div>
                              {item.badge && (
                                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                                  <span>⭐</span> {item.badge}
                                </span>
                              )}
                            </div>

                            {/* Item Name */}
                            <h3 className="font-bold text-gray-900 mb-1 text-sm">
                              {item.name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-gray-900">
                                ₹{item.price}
                              </span>
                              {item.originalPrice && (
                                <>
                                  <span className="text-xs text-gray-500 line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                  <span className="text-xs font-bold text-green-600">
                                    {item.discount}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Rating */}
                            {item.rating && (
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-yellow-500">⭐</span>
                                <span className="font-bold text-gray-900">
                                  {item.rating}
                                </span>
                                <span className="text-gray-600">
                                  ({item.ratingCount})
                                </span>
                              </div>
                            )}

                            {/* More Details Link */}
                            {item.originalPrice && (
                              <button className="text-gray-600 text-xs font-semibold mt-2 flex items-center gap-1 hover:text-gray-900">
                                More Details <span>&gt;</span>
                              </button>
                            )}
                          </div>

                          {/* Item Image and Add Button */}
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-32 h-28 rounded-lg overflow-hidden bg-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {quantity > 0 ? (
                              <div className="flex items-center gap-2 bg-green-50 rounded-lg px-2 py-1 border border-green-600">
                                <button
                                  onClick={() => handleDecreaseQuantity(item)}
                                  className="text-green-600 hover:bg-green-100 p-1 rounded transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-sm font-bold text-green-600 w-6 text-center">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => handleIncreaseQuantity(item)}
                                  className="text-green-600 hover:bg-green-100 p-1 rounded transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="px-6 py-1.5 text-green-600 font-bold text-sm border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                              >
                                ADD
                              </button>
                            )}
                          </div>
                        </div>
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
        <div className="fixed bottom-0 left-1/2 bg-green-600 text-white px-4 py-4 flex items-center justify-between shadow-2xl w-full max-w-6xl transform -translate-x-1/2">
          <div className="w-full flex items-center justify-between">
            <div className="font-bold text-sm">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"} | ₹
              {totalPrice}
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-opacity"
            >
              VIEW CART <span className="text-lg">🛒</span>
            </button>
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
