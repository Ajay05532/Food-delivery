import React from "react";
import pizzaGirl from "../assets/girl1.png";
import noodlesGirl from "../assets/girl2.png";

export default function Hero() {
  return (
    <section className="w-full py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 bg-gray-100 relative">
        <div className="h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-6 z-10">
            <p className="text-sm text-gray-600">
              Order Restaurant food, takeaway and groceries.
            </p>

            <h1 className="text-5xl lg:text-5xl font-bold leading-tight">
              Feast Your Senses, <br />
              <span className="text-orange-500">Fast and Fresh</span>
            </h1>

            <div className="flex items-center gap-2 border-2 border-gray-300 rounded-full px-5 py-3 w-full max-w-sm">
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

          {/* RIGHT SIDE (orange BG + noodles girl + cards) */}
          <div className="relative h-full flex items-center justify-center">
            {/* ORANGE SHAPE */}
            <div className="absolute -right-10 bottom-0 h-[96%] w-[80%] bg-orange-500 rounded-tl-[200px] z-0"></div>

            {/* NOODLES GIRL (right side) */}
            <img
              src={noodlesGirl}
              alt="noodles girl"
              className="absolute left-13 bottom-0 h-[400px] rounded-lg shadow-xl z-20"
            />

            {/* ORDER CARD 1 */}
            <div className="absolute top-10 right-10 bg-white shadow-xl p-3 rounded-lg w-56 z-30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold">Order</p>
                <span className="text-xs text-gray-400">now</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                We've received your order!
              </p>
              <p className="text-xs text-gray-500">
                Awaiting restaurant acceptance
              </p>
            </div>

            {/* ORDER CARD 2 */}
            <div className="absolute top-44 right-10 bg-white shadow-xl p-3 rounded-lg w-56 z-30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold">Order Accepted!</p>
                <span className="text-xs text-gray-400">now</span>
              </div>
              <p className="text-xs text-gray-500">
                Your order will be delivered shortly
              </p>
              <p className="text-xs text-green-600 font-semibold">✓</p>
            </div>

            {/* ORDER CARD 3 */}
            <div className="absolute bottom-12 right-10 bg-white shadow-xl p-3 rounded-lg w-56 z-30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold">Order</p>
                <span className="text-xs text-gray-400">now</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Your rider is nearby!
              </p>
              <p className="text-xs text-gray-500">
                They're almost there — get ready!
              </p>
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
