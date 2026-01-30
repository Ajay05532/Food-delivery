import React, { useState } from "react";
import { MapPin, Phone, Heart, Share2, ChevronRight } from "lucide-react";

const Header = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const defaultRestaurant = {
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

  const data = restaurant || defaultRestaurant;

  return (
    <div className= "bg-white px-4 shadow-md">
      {/* Banner Section */}
      <div className="relative h-96 bg-gray-200 overflow-hidden">
        <img
          src={data.bannerImage}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with Delivery Badge */}
        <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
          Delivery only
        </div>

        {/* Action Buttons - Top Right */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
          >
            <Heart
              size={24}
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}
            />
          </button>
          <button className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all">
            <Share2 size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Restaurant Info Section */}
      <div className="px-6 py-6 border-b border-gray-200">
        {/* Name and Cuisine */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{data.name}</h1>
        <p className="text-gray-600 text-sm mb-4">{data.cuisine}</p>

        {/* Ratings Section */}
        <div className="flex gap-6 mb-4">
          {data.deliveryCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center bg-green-50 rounded-lg w-16 h-16 border-2 border-green-600">
                <span className="text-xl font-bold text-green-600">{data.deliveryRating}</span>
                <span className="text-xs text-green-600 font-semibold">Delivery</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Delivery Ratings</p>
                <p className="text-sm font-semibold text-gray-700">{data.deliveryCount.toLocaleString()}</p>
              </div>
            </div>
          )}

          {data.diningCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg w-16 h-16 border-2 border-blue-600">
                <span className="text-xl font-bold text-blue-600">{data.diningRating}</span>
                <span className="text-xs text-blue-600 font-semibold">Dining</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dining Ratings</p>
                <p className="text-sm font-semibold text-gray-700">{data.diningCount.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            <MapPin size={18} />
            Direction
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-red-500 hover:text-red-500 transition-colors">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* Contact and Details */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <Phone size={18} className="text-red-500 flex-shrink-0 mt-1" />
          <a href={`tel:${data.phone}`} className="text-red-500 font-semibold hover:underline">
            {data.phone}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-gray-600 flex-shrink-0 mt-1" />
          <p className="text-gray-700 text-sm">{data.address}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-6 py-4 bg-white flex gap-6 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-1">Delivery Time</p>
          <p className="font-semibold text-gray-900">{data.deliveryTime}</p>
        </div>
        <div className="border-l border-gray-200"></div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Min Order</p>
          <p className="font-semibold text-gray-900">{data.minOrder}</p>
        </div>
        <div className="border-l border-gray-200"></div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Delivery Charge</p>
          <p className="font-semibold text-gray-900">{data.deliveryCharge}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;