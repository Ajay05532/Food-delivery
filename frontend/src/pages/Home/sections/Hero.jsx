import React from "react";
import pizzaGirl from "../../../assets/girl1.png";
import noodlesGirl from "../../../assets/girl2.png";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-8 md:py-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-gray-100 dark:bg-gray-900/50 relative border border-gray-300 dark:border-gray-800 rounded-2xl shadow-sm transition-all duration-300">
        <div className="min-h-[500px] md:h-[500px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-8 md:py-0">
          {/* LEFT SIDE */}
          <div className="space-y-6 z-10 relative">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide">
              Order Restaurant food, takeaway and groceries.
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              Feast Your Senses, <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Fast and Fresh
              </span>
            </h1>

            <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg">
              Delicious food delivered in 30 minutes or less. Hot, fresh, and
              ready to enjoy.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-2 border-gray-300 dark:border-gray-700 rounded-2xl sm:rounded-full px-2 sm:px-5 py-2 w-full max-w-md bg-white dark:bg-gray-800/50">
              <div className="flex items-center gap-2 flex-1 px-2 py-1">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. EC4R 3TE"
                  className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 w-full"
                />
              </div>
              <button className="bg-orange-500 text-white px-6 py-2.5 rounded-xl sm:rounded-full font-semibold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 w-full sm:w-auto">
                Search
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (gradient BG + noodles girl + cards) */}
          <div className="relative h-[300px] md:h-full flex items-center justify-center mt-8 md:mt-0">
            {/* GRADIENT SHAPE */}
            <div className="absolute right-0 md:-right-10 bottom-0 h-full md:h-[96%] w-full md:w-[80%] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-t-[40px] md:rounded-tl-[200px] md:rounded-bl-[50px] z-0 opacity-90 dark:opacity-80"></div>

            {/* NOODLES GIRL (right side) - Hidden on mobile, shown on large screens */}
            <img
              src={noodlesGirl}
              alt="noodles girl"
              className="hidden md:block absolute left-4 lg:left-13 bottom-0 h-[300px] lg:h-[400px] rounded-lg shadow-xl z-20 object-contain"
            />

            {/* ORDER CARD 1 - Enhanced */}
            <div className="absolute -top-4 right-4 md:top-5 md:right-2 lg:right-7 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl p-4 rounded-2xl w-[11rem] md:w-52 lg:w-60 z-30 border border-white/40 dark:border-gray-700/40 hover:scale-105 transition-all duration-300 animate-float">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] md:text-xs font-bold">
                      🍕
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                    New Order
                  </p>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                  Just now
                </span>
              </div>
              <p className="text-[10px] md:text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-semibold mb-1">
                We've received your order!
              </p>
              <div className="mt-1 md:mt-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-1 md:p-1.5">
                <div className="flex gap-1">
                  <div className="h-1 flex-1 bg-orange-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* ORDER CARD 2 - Enhanced */}
            <div className="absolute top-1/2 right-0 md:top-1/2 md:-translate-y-1/2 md:right-6 lg:right-15 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl p-4 rounded-2xl w-[11rem] md:w-52 lg:w-60 z-30 border border-white/40 dark:border-gray-700/40 hover:scale-105 transition-all duration-300 animate-float-delay-1 hidden sm:block">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm md:text-lg">✓</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                    Accepted!
                  </p>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                  2 min ago
                </span>
              </div>
              <p className="text-[10px] md:text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-semibold mb-1">
                Your order is being prepared
              </p>
              <div className="mt-1 md:mt-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-1 md:p-1.5">
                <div className="flex gap-1">
                  <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* ORDER CARD 3 - Enhanced */}
            <div className="absolute -bottom-4 right-4 md:bottom-5 md:right-2 lg:right-7 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl p-4 rounded-2xl w-[11rem] md:w-52 lg:w-60 z-30 border border-white/40 dark:border-gray-700/40 hover:scale-105 transition-all duration-300 animate-float-delay-2">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] md:text-xs font-bold">
                      🏍️
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                    On the way
                  </p>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                  5 min ago
                </span>
              </div>
              <p className="text-[10px] md:text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-semibold mb-1">
                Your rider is nearby!
              </p>
              <div className="mt-1 md:mt-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-1 md:p-1.5">
                <div className="flex gap-1">
                  <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PIZZA GIRL – CENTER OF THE HERO (Desktop only or adjusted) */}
        <img
          src={pizzaGirl}
          alt="pizza girl"
          className="hidden md:block absolute left-[46%] bottom-0 -translate-x-1/2 h-[350px] lg:h-[480px] z-40"
        />

        {/* Mobile Pizza Girl */}
        <img
          src={pizzaGirl}
          alt="pizza girl mobile"
          className="md:hidden absolute bottom-0 left-0 h-[250px] sm:h-[300px] z-20 opacity-90 object-contain"
        />
      </div>
    </section>
  );
}
