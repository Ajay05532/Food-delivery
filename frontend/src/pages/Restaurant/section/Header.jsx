import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Header = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const data = restaurant

  // Use gallery images from backend if available, fallback to coverImage, then default
  const galleryImages =
    data.gallery && data.gallery.length > 0
      ? data.gallery
      : data.coverImage
        ? [data.coverImage]
        : data.galleryImages || [data.bannerImage];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="bg-white shadow-md">
      {/* Banner Section - Multi Image Grid */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="relative h-120 bg-gray-200 overflow-hidden rounded-lg">
          <div className="flex h-full gap-1">
            {/* Main Large Image - Left Side */}
            <div className="flex-[2] relative overflow-hidden">
              <img
                src={galleryImages[0]}
                alt={`${data.name} - Main`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right Side - Grid of 3 Images */}
            <div className="flex-1 flex flex-col gap-1">
              {galleryImages.slice(1, 4).map((image, index) => (
                <div
                  key={index}
                  className="flex-1 relative overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowGallery(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`${data.name} - ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />

                  {/* View Gallery Button on Last Image */}
                  {index === 2 && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(0);
                          setShowGallery(true);
                        }}
                        className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        View Gallery
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Overlay with Delivery Badge */}
          <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
            Delivery only
          </div>

          {/* Action Buttons - Top Right */}
          <div className="absolute top-4 right-4 flex gap-3 z-10">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
            >
              <Heart
                size={24}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }
              />
            </button>
            <button className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all">
              <Share2 size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <>
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-[200] transition-opacity duration-300"
            onClick={() => setShowGallery(false)}
          />

          {/* Gallery Content */}
          <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X size={24} className="text-gray-900" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Previous Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={28} className="text-gray-900" />
              </button>
            )}

            {/* Current Image */}
            <div
              className="max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[currentImageIndex]}
                alt={`${data.name} - Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Next Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={28} className="text-gray-900" />
              </button>
            )}

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black bg-opacity-60 p-3 rounded-lg max-w-full overflow-x-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-orange-500 scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Restaurant Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-6 border-b border-gray-200">
        {/* Name and Cuisine */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{data.name}</h1>
        <p className="text-gray-600 text-sm mb-4">{data.cuisine}</p>

        {/* Ratings Section */}
        <div className="flex gap-6 mb-4">
          {data.deliveryCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center bg-green-50 rounded-lg w-16 h-16 border-2 border-green-600">
                <span className="text-xl font-bold text-green-600">
                  {data.deliveryRating}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  Delivery
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Delivery Ratings</p>
                <p className="text-sm font-semibold text-gray-700">
                  {data.deliveryCount.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {data.diningCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg w-16 h-16 border-2 border-blue-600">
                <span className="text-xl font-bold text-blue-600">
                  {data.diningRating}
                </span>
                <span className="text-xs text-blue-600 font-semibold">
                  Dining
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dining Ratings</p>
                <p className="text-sm font-semibold text-gray-700">
                  {data.diningCount.toLocaleString()}
                </p>
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
      <div className="max-w-6xl mx-auto px-4 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <Phone size={18} className="text-red-500 flex-shrink-0 mt-1" />
          <a
            href={`tel:${data.phone}`}
            className="text-red-500 font-semibold hover:underline"
          >
            {data.phone}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-gray-600 flex-shrink-0 mt-1" />
          <p className="text-gray-700 text-sm">
            {typeof data.address === "object" && data.address
              ? `${data.address.street || ""} ${data.address.area || ""}, ${data.address.city || ""}`.trim()
              : data.address || "Address not available"}
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="max-w-6xl mx-auto px-4 py-4 bg-white flex gap-6 text-sm">
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
