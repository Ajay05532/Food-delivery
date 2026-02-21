import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, ShoppingBag, Star, MapPin, Clock, Trash2 } from "lucide-react";

const STORAGE_KEY = "foodhub_favourites";

/* ─── Helpers ──────────────────────────────────────────── */
function loadFavourites(userId) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavourites(userId, list) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(list));
  } catch {}
}

/* ─── Public hook — call this anywhere to add a restaurant ─ */
export function useFavourites() {
  const { user } = useSelector((state) => state.user);
  const userId = user?._id || "guest";

  const toggle = (restaurant) => {
    const current = loadFavourites(userId);
    const exists = current.some((r) => r._id === restaurant._id);
    const updated = exists
      ? current.filter((r) => r._id !== restaurant._id)
      : [{ ...restaurant, savedAt: new Date().toISOString() }, ...current];
    saveFavourites(userId, updated);
    return !exists; // true = now favourite
  };

  const isFavourite = (restaurantId) =>
    loadFavourites(userId).some((r) => r._id === restaurantId);

  return { toggle, isFavourite };
}

/* ─── Favourites panel ─────────────────────────────────── */
const Favourites = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id || "guest";

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setFavourites(loadFavourites(userId));
  }, [userId]);

  const handleRemove = (restaurantId) => {
    const updated = favourites.filter((r) => r._id !== restaurantId);
    saveFavourites(userId, updated);
    setFavourites(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Favourites</h2>
        <span className="text-sm text-gray-400">{favourites.length} saved</span>
      </div>

      {favourites.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Heart className="w-14 h-14 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-1">
            No favourites yet
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Tap the ♡ icon on any restaurant to save it here
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm"
          >
            Explore Restaurants
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {favourites.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4">
                {/* Thumbnail */}
                <div
                  className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                >
                  {restaurant.coverImage ? (
                    <img
                      src={restaurant.coverImage}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-50">
                      <ShoppingBag className="w-7 h-7 text-orange-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                >
                  <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {restaurant.name}
                  </h3>

                  {/* Rating + delivery time row */}
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {restaurant.avgRating > 0 && (
                      <span className="flex items-center gap-1 text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-white" />
                        {restaurant.avgRating.toFixed(1)}
                      </span>
                    )}
                    {(restaurant.minDeliveryTime ||
                      restaurant.maxDeliveryTime) && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {restaurant.minDeliveryTime}–
                        {restaurant.maxDeliveryTime} mins
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  {restaurant.address?.area && (
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {restaurant.address.area}
                    </p>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(restaurant._id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  title="Remove from favourites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Visit button strip */}
              <div className="border-t border-gray-100 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  Saved{" "}
                  {new Date(restaurant.savedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <button
                  onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                  className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  ORDER NOW →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
