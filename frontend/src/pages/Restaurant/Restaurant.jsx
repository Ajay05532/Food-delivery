import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./section/Header";
import Menu from "./section/Menu";
import Footer from "../../layout/footer";
import { getRestaurantById, getMenu } from "../../services/restaurant.sevice";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurant and menu data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch both restaurant and menu data in parallel
        const [restaurantData, menuData] = await Promise.all([
          getRestaurantById(id),
          getMenu(id),
        ]);

        setRestaurant(restaurantData);
        setMenuItems(menuData);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load restaurant. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading restaurant...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mr-2"
          >
            Retry
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Restaurant not found
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Restaurant not found
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-4 transition-colors duration-300">
      {/* Restaurant Header */}
      <Header restaurant={restaurant} />

      {/* Restaurant Menu */}
      <Menu
        restaurantId={restaurant._id}
        restaurantName={restaurant.name}
        menuItems={menuItems}
      />

      <Footer />
    </div>
  );
};

export default Restaurant;
