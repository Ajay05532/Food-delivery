import React from "react";
import pizzaGirl from "../../../assets/girl1.png";
import noodlesGirl from "../../../assets/girl2.png";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 bg-gray-100 relative border-1 border-gray-300 rounded-lg shadow-sm">
        <div className="h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-6 z-10">
            <p className="text-sm text-gray-600">
              Order Restaurant food, takeaway and groceries.
            </p>

            <h1 className="text-5xl lg:text-5xl font-bold leading-tight">
              Feast Your Senses, <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Fast and Fresh
              </span>
            </h1>

            <p className="text-base text-gray-600">
              Delicious food delivered in 30 minutes or less. Hot, fresh, and
              ready to enjoy.
            </p>

            <div className="flex items-center gap-2 border-2 border-gray-300 rounded-full px-5 py-3 w-full max-w-sm">
              <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="e.g. EC4R 3TE"
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-orange-600 transition">
                Search
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (gradient BG + noodles girl + cards) */}
          <div className="relative h-full flex items-center justify-center">
            {/* GRADIENT SHAPE */}
            <div className="absolute -right-10 bottom-0 h-[96%] w-[80%] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-tl-[200px] z-0"></div>

            {/* NOODLES GIRL (right side) */}
            <img
              src={noodlesGirl}
              alt="noodles girl"
              className="absolute left-13 bottom-0 h-[400px] rounded-lg shadow-xl z-20"
            />

            {/* ORDER CARD 1 - Enhanced */}
            <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md shadow-2xl p-4 rounded-2xl w-60 z-30 border border-white/40 hover:scale-105 transition-all duration-300 animate-float">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🍕</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">New Order</p>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  Just now
                </span>
              </div>
              <p className="text-sm text-gray-700 font-semibold mb-1">
                We've received your order!
              </p>
              <p className="text-xs text-gray-500">
                Awaiting restaurant acceptance
              </p>
              <div className="mt-3 bg-orange-50 rounded-lg p-2">
                <div className="flex gap-1">
                  <div className="h-1 flex-1 bg-orange-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* ORDER CARD 2 - Enhanced */}
            <div className="absolute top-44 right-10 bg-white/90 backdrop-blur-md shadow-2xl p-4 rounded-2xl w-60 z-30 border border-white/40 hover:scale-105 transition-all duration-300 animate-float-delay-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">Accepted!</p>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  2 min ago
                </span>
              </div>
              <p className="text-sm text-gray-700 font-semibold mb-1">
                Your order is being prepared
              </p>
              <p className="text-xs text-gray-500">
                Estimated time: 25 minutes
              </p>
              <div className="mt-3 bg-green-50 rounded-lg p-2">
                <div className="flex gap-1">
                  <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* ORDER CARD 3 - Enhanced */}
            <div className="absolute bottom-12 right-10 bg-white/90 backdrop-blur-md shadow-2xl p-4 rounded-2xl w-60 z-30 border border-white/40 hover:scale-105 transition-all duration-300 animate-float-delay-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🏍️</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">On the way</p>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  5 min ago
                </span>
              </div>
              <p className="text-sm text-gray-700 font-semibold mb-1">
                Your rider is nearby!
              </p>
              <p className="text-xs text-gray-500">
                They're almost there — get ready!
              </p>
              <div className="mt-3 bg-blue-50 rounded-lg p-2">
                <div className="flex gap-1">
                  <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PIZZA GIRL – CENTER OF THE HERO */}
        <img
          src={pizzaGirl}
          alt="pizza girl"
          className="absolute left-[46%] bottom-0 -translate-x-1/2 h-[480px] z-40"
        />
      </div>
    </section>
  );
}
