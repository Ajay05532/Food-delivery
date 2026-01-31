import React, { useState } from "react";
import { Search, ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../redux/hooks/useCart";


const Menu = ({ restaurantId = "restaurant-1", restaurantName = "Punjabi Angithi By Vegorama Group" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(["veg", "non-veg"]);
  const [expandedCategory, setExpandedCategory] = useState(0);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const navigate = useNavigate();
  const { items, totalQuantity, totalPrice, addToCart, increaseQuantity, decreaseQuantity, restaurantId: cartRestaurantId } = useCart();

  const categories = [
    { id: 0, name: "Want to repeat?", items: 3 },
    { id: 1, name: "Crazy Biryani Box (1 Kg Serves 2)", items: 11 },
    { id: 2, name: "Hyderabadi Biryani", items: 8 },
    { id: 3, name: "Chicken Biryani", items: 6 },
    { id: 4, name: "Mutton Biryani", items: 5 },
    { id: 5, name: "Veg Biryani", items: 4 },
    { id: 6, name: "Appetizers", items: 10 },
    { id: 7, name: "Breads", items: 7 },
  ];

  const menuItems = {
    0: [
      {
        id: 1,
        name: "Egg Biryani Bowl - 500ml",
        type: "veg",
        price: 289,
        badge: "bestseller",
        image: "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=200&h=200&fit=crop",
      },
      {
        id: 2,
        name: "Basmati Biryani Rice (400 Grams)",
        type: "veg",
        price: 199,
        badge: null,
        image: "https://images.unsplash.com/photo-1612874742237-415221591328?w=200&h=200&fit=crop",
      },
      {
        id: 3,
        name: "Biryani Mix (400g)",
        type: "veg",
        price: 249,
        badge: null,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=200&h=200&fit=crop",
      },
    ],
    1: [
      {
        id: 4,
        name: "Veg Dum Hyderabadi Biryani (1 Kg Serves 2)",
        type: "veg",
        price: 479,
        originalPrice: 599,
        discount: "20% OFF",
        rating: 5.0,
        ratingCount: 1,
        image: "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=200&h=200&fit=crop",
      },
      {
        id: 5,
        name: "Paneer 65 Hyderabadi Biryani (1 Kg Serves 2)",
        type: "veg",
        price: 519,
        originalPrice: 649,
        discount: "20% OFF",
        rating: 4.8,
        ratingCount: 5,
        image: "https://images.unsplash.com/photo-1612874742237-415221591328?w=200&h=200&fit=crop",
      },
      {
        id: 6,
        name: "Paneer 65 Hyderabadi Biryani (1 Kg Serves 2)",
        type: "veg",
        price: 699,
        rating: null,
        ratingCount: 0,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=200&h=200&fit=crop",
      },
    ],
    2: [
      {
        id: 7,
        name: "Chicken Hyderabadi Biryani",
        type: "non-veg",
        price: 599,
        rating: 4.6,
        ratingCount: 12,
        image: "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=200&h=200&fit=crop",
      },
    ],
    3: [
      {
        id: 8,
        name: "Murgh Hyderabadi Biryani",
        type: "non-veg",
        price: 649,
        rating: 4.5,
        ratingCount: 8,
        image: "https://images.unsplash.com/photo-1612874742237-415221591328?w=200&h=200&fit=crop",
      },
    ],
    4: [
      {
        id: 9,
        name: "Goat Biryani",
        type: "non-veg",
        price: 749,
        rating: 4.7,
        ratingCount: 6,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=200&h=200&fit=crop",
      },
    ],
    5: [
      {
        id: 10,
        name: "Vegetables Biryani",
        type: "veg",
        price: 399,
        rating: 4.4,
        ratingCount: 15,
        image: "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=200&h=200&fit=crop",
      },
    ],
    6: [
      {
        id: 11,
        name: "Paneer Tikka",
        type: "veg",
        price: 249,
        image: "https://images.unsplash.com/photo-1612874742237-415221591328?w=200&h=200&fit=crop",
      },
    ],
    7: [
      {
        id: 12,
        name: "Garlic Naan",
        type: "veg",
        price: 79,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=200&h=200&fit=crop",
      },
    ],
  };

  const filters = [
    { id: "veg", label: "Veg", icon: "🟢" },
    { id: "non-veg", label: "Non-Veg", icon: "🔴" },
  ];

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
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

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  const getFilteredItems = (categoryId) => {
    const allItems = menuItems[categoryId] || [];
    return allItems.filter((item) => selectedFilters.includes(item.type));
  };

  const getItemQuantity = (itemId) => {
    const item = items.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 mb-4">
        <h1 className="text-center text-gray-600 text-sm tracking-widest mb-8">~ MENU ~</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for dishes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-200 rounded-full focus:outline-none focus:bg-gray-100 text-gray-700"
          />
          <Search className="absolute right-4 top-3.5 text-gray-500" size={20} />
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
        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const filteredItems = getFilteredItems(category.id);
            if (filteredItems.length === 0) return null;

            return (
              <div key={category.id} className="border-b border-gray-200 pb-6">
                {/* Category Header */}
                <div
                  className="flex items-center justify-between cursor-pointer mb-4 hover:opacity-80 transition-opacity"
                  onClick={() =>
                    setExpandedCategory(expandedCategory === category.id ? null : category.id)
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
                        <div key={item.id} className="flex gap-4 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
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
                                    item.type === "veg" ? "bg-green-600" : "bg-red-600"
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
                              <span className="font-bold text-gray-900">₹{item.price}</span>
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
                                <span className="font-bold text-gray-900">{item.rating}</span>
                                <span className="text-gray-600">({item.ratingCount})</span>
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
                                  onClick={() => handleDecreaseQuantity(item.id)}
                                  className="text-green-600 hover:bg-green-100 p-1 rounded transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-sm font-bold text-green-600 w-6 text-center">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => handleIncreaseQuantity(item.id)}
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
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"} | ₹{totalPrice}
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
      {/* <RestaurantSwitchModal
        isOpen={showSwitchModal}
        onClose={() => {
          setShowSwitchModal(false);
          setPendingItem(null);
        }}
        onConfirm={() => {
          if (pendingItem) {
            handleAddToCart(pendingItem);
          }
          setShowSwitchModal(false);
          setPendingItem(null);
        }}
      /> */}
    </div>
  );
};

export default Menu;