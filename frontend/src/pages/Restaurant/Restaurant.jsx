import React from "react";
import { useParams } from "react-router-dom";
import Header from "./section/Header";
import Menu from "./section/Menu";
import Footer from "../../layout/footer";

const Restaurant = () => {
  const { id } = useParams();

  // Sample restaurant data - in real app, fetch from API
  const restaurant = {
    id: id,
    name: "Punjabi Angithi By Vegorama Group",
    cuisine: "North Indian, Biryani, Chinese, Rolls, Momos",
    address: "Shop 4, Ground Floor, Janta Market, Jhandewalan, Karol Bagh, New Delhi",
    phone: "+917428772532",
    bannerImage: "https://images.unsplash.com/photo-1631040822134-bfd8a6b72e2f?w=1200&h=400&fit=crop",
    deliveryRating: 4.1,
    deliveryCount: 6462,
    diningRating: 0,
    diningCount: 0,
    deliveryTime: "35 min",
    minOrder: "₹200",
    deliveryCharge: "Free",
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Restaurant Header */}
      <Header restaurant={restaurant} />

        {/* Restaurant Menu */}
        <Menu restaurantId={id} />

        <Footer />

    </div>
  );
};

export default Restaurant;