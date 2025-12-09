import React from "react";
import {
  CircleUserRound,
  ShoppingCart,
  Search,
  BadgeDollarSign,
  LifeBuoy,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="flex h-24 items-center justify-between px-12">
            <div className="flex items-center gap-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-base font-bold text-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    Logo
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-50">
                    <span>Others</span>
                    <ChevronDown className="h-4 w-4 text-orange-500"/>
                </button>
            </div>

            <nav className="flex items-center gap-10">
                <button className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-sm font-semibold text-white hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
                    Home
                </button>

                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                    <Search className="h-5 w-5"/>
                    <span>Search</span>
                </button>

                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                    <BadgeDollarSign className="h-5 w-5"/>
                    <span>Offers</span>
                </button>

                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                    <LifeBuoy className="h-5 w-5"/>
                    <span>Help</span>
                </button>

                <button className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                    <div className="relative">
                        <ShoppingCart className="h-6 w-6"/>
                        <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-md">
                            5
                        </span>
                    </div>
                    <span>Cart</span>
                </button>

                <button className="flex w-auto items-center gap-2.5 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 text-sm font-semibold text-white hover:shadow-lg hover:from-gray-950 hover:to-gray-900 transition-all duration-200 justify-around">
                    <CircleUserRound className="h-5 w-5 bg-orange-500 rounded-full"/>
                    <span>Signup / Login</span>
                </button>
            </nav>
        </div>
    </header>
  );
};

export default Navbar;