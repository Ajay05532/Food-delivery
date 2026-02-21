import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Bike,
  Utensils,
  TrendingUp,
} from "lucide-react";

const Header = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shared, setShared] = useState(false);

  const data = restaurant;
  const galleryImages =
    data.gallery?.length > 0
      ? data.gallery
      : data.coverImage
        ? [data.coverImage]
        : data.galleryImages || [data.bannerImage];

  const prev = () =>
    setCurrentImageIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  const next = () =>
    setCurrentImageIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  const quickStats = [
    {
      icon: Clock,
      label: "Delivery Time",
      value: data.deliveryTime || "30-40 min",
    },
    {
      icon: Bike,
      label: "Delivery Charge",
      value: data.deliveryCharge || "Free",
    },
    { icon: Utensils, label: "Min Order", value: data.minOrder || "₹0" },
    {
      icon: TrendingUp,
      label: "Avg Rating",
      value: data.deliveryRating || "4.0",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-0">
        <div className="relative h-64 md:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
          {/* Image grid */}
          <div className="flex h-full gap-1.5">
            <div className="flex-[2] relative overflow-hidden group">
              <img
                src={galleryImages[0]}
                alt={data.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="hidden md:flex flex-1 flex-col gap-1.5">
              {galleryImages.slice(1, 4).map((img, i) => (
                <div
                  key={i}
                  className="flex-1 relative overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setCurrentImageIndex(i + 1);
                    setShowGallery(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`${data.name} ${i + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {i === 2 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(0);
                          setShowGallery(true);
                        }}
                        className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 font-bold rounded-xl text-sm hover:bg-white transition-colors"
                      >
                        View All Photos
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            <Bike className="w-3.5 h-3.5" />
            Delivery Available
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all"
            >
              <Heart
                size={20}
                className={
                  isFavorite
                    ? "fill-rose-500 text-rose-500"
                    : "text-gray-600 dark:text-gray-300"
                }
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all"
            >
              <Share2
                size={20}
                className={
                  shared
                    ? "text-orange-500"
                    : "text-gray-600 dark:text-gray-300"
                }
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Gallery Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {showGallery && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[200] backdrop-blur-sm"
              onClick={() => setShowGallery(false)}
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2.5 text-white hover:bg-white/20 transition-colors z-10"
              >
                <X size={22} />
              </button>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft size={26} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight size={26} />
                  </button>
                </>
              )}
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl max-h-[80vh] w-full flex items-center justify-center"
              >
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`Gallery ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              </motion.div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-sm p-2.5 rounded-2xl overflow-x-auto max-w-full">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === i ? "border-orange-500 scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── Restaurant Info ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {data.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              {data.cuisine}
            </p>

            {/* Rating badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              {data.deliveryCount > 0 && (
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {data.deliveryRating}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-emerald-200 dark:bg-emerald-700" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">
                    {data.deliveryCount?.toLocaleString()} ratings
                  </span>
                </div>
              )}
              {data.diningCount > 0 && (
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
                    <span className="font-bold text-blue-700 dark:text-blue-400">
                      {data.diningRating}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-blue-200 dark:bg-blue-700" />
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    {data.diningCount?.toLocaleString()} dine-in
                  </span>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex gap-3 flex-wrap">
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold text-sm hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
              >
                <Phone size={16} /> Call
              </a>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:border-orange-400 hover:text-orange-500 transition-colors">
                <MapPin size={16} /> Directions
              </button>
            </div>
          </div>

          {/* Address card */}
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 border border-orange-100 dark:border-gray-700 rounded-2xl p-4 text-sm max-w-xs w-full">
            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <p>
                {typeof data.address === "object" && data.address
                  ? `${data.address.street || ""} ${data.address.area || ""}, ${data.address.city || ""}`.trim()
                  : data.address || "Address not available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats bar ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3 flex items-center gap-3 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                  {label}
                </p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
