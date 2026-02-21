import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../redux/slices/orderSlice";
import SavedAddresses from "./section/SavedAddresses";
import Favourites from "./section/Favourites";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  CreditCard,
  MapPin,
  Settings,
  ChevronRight,
  RefreshCw,
  HelpCircle,
  Package,
  CheckCircle2,
  Truck,
  XCircle,
  Clock,
  Star,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Loader2,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "favorites", label: "Favourites", icon: Heart },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
];

const STATUS_CONFIG = {
  DELIVERED: {
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
    icon: CheckCircle2,
    label: "Delivered",
    dot: "bg-emerald-500",
  },
  PLACED: {
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-500/20",
    icon: Clock,
    label: "Order Placed",
    dot: "bg-orange-500",
  },
  CONFIRMED: {
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/20",
    icon: CheckCircle2,
    label: "Confirmed",
    dot: "bg-blue-500",
  },
  PREPARING: {
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
    border: "border-yellow-200 dark:border-yellow-500/20",
    icon: Package,
    label: "Preparing",
    dot: "bg-yellow-500",
  },
  OUT_FOR_DELIVERY: {
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/20",
    icon: Truck,
    label: "Out for Delivery",
    dot: "bg-blue-500",
  },
  CANCELLED: {
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/20",
    icon: XCircle,
    label: "Cancelled",
    dot: "bg-rose-500",
  },
};

function getStatus(status = "") {
  return STATUS_CONFIG[status.toUpperCase()] || STATUS_CONFIG.PLACED;
}

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    color,
    bg,
    border,
    icon: StatusIcon,
    label,
    dot,
  } = getStatus(order.status);

  const itemsSummary =
    order.items?.map((i) => `${i.quantity} × ${i.name}`).join(", ") || "—";
  const shortId = order._id?.slice(-10).toUpperCase();
  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const total = order.pricing?.grandTotal ?? order.totalAmount ?? 0;
  const restaurantName = order.restaurant?.name || "Restaurant";
  const restaurantArea =
    order.restaurant?.address?.area || order.restaurant?.address?.city || "";
  const coverImage = order.restaurant?.coverImage;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:border-orange-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row gap-4 sm:items-center p-5 sm:p-6 pb-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100 dark:border-gray-800">
          {coverImage ? (
            <img
              src={coverImage}
              alt={restaurantName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-800">
              <ShoppingBag className="w-8 h-8 text-orange-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-gray-900 dark:text-white text-lg truncate pr-4">
                {restaurantName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {restaurantArea}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                <span>#{shortId}</span>
                <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span>{dateStr}</span>
              </div>
            </div>

            <div className={`flex flex-col items-end gap-2 shrink-0`}>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs ${bg} ${color} ${border}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`}
                />
                {label}
              </div>
              <span className="text-gray-900 dark:text-white font-black">
                ₹{total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Preview */}
      <div className="px-5 sm:px-6 pb-5 border-b border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium truncate max-w-[70%]">
          {itemsSummary}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-orange-500 font-bold text-sm bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
        >
          {expanded ? "Less" : "View"}{" "}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50/50 dark:bg-gray-800/50 text-sm"
          >
            <div className="p-5 sm:px-6 space-y-3">
              {order.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center group/item"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs">
                      {item.quantity}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-bold tracking-tight">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-dashed border-gray-200 dark:border-gray-700/60 space-y-2">
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
                  <span>Item Total</span>
                  <span>
                    ₹{order.totalAmount || order.pricing?.subtotal || total}
                  </span>
                </div>
                {order.pricing?.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-₹{order.pricing?.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-gray-900 dark:text-white text-base pt-2">
                  <span>Grand Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="px-5 sm:px-6 py-4 flex flex-wrap items-center justify-end gap-3 bg-gray-50 dark:bg-gray-900/50">
        <button className="flex items-center gap-1.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm">
          <HelpCircle className="w-4 h-4" /> HELP
        </button>
        <button className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95">
          <RefreshCw className="w-4 h-4" /> REORDER
        </button>
      </div>
    </div>
  );
};

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  const {
    items: orders,
    loading,
    error,
  } = useSelector((state) => state.orders);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchOrders());
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center max-w-sm text-center"
        >
          <div className="w-24 h-24 bg-orange-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-orange-500">
            <Package className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Login Required
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
            Log in to view your order history, track deliveries, and more.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all w-full">
            Log In Now
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-20">
      {/* Decorative bg glow */}
      <div className="fixed top-0 left-0 w-full h-80 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      {/* User Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 relative z-10">
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-[2rem] p-8 sm:p-10 shadow-xl overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center border-4 border-gray-900">
                  <span className="text-3xl font-black text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                  {user?.name || "User"}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 font-medium text-sm">
                  {user?.phone && (
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-orange-500" />{" "}
                      {user.phone}
                    </span>
                  )}
                  <span className="hidden sm:block opacity-40">•</span>
                  {user?.email && <span>{user.email}</span>}
                </div>
              </div>
            </div>

            <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors backdrop-blur-sm border border-white/10 flex items-center gap-2 mt-4 sm:mt-0">
              <Settings className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 hidden md:block">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-3 shadow-sm border border-gray-200 dark:border-gray-800 sticky top-28">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all mb-1 last:mb-0
                      ${
                        isActive
                          ? "bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-500/10 dark:to-pink-500/10 text-orange-600 dark:text-orange-500"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}
                    />
                    {label}
                  </button>
                );
              })}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 px-2">
                <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all">
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav Select */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 font-bold text-gray-900 dark:text-white outline-none focus:border-orange-500 appearance-none shadow-sm"
            >
              {NAV_ITEMS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
                      Order History
                    </h2>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium text-sm rounded-2xl px-5 py-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" /> Failed to load
                        orders: {error}
                      </div>
                    )}

                    {loading && orders.length === 0 ? (
                      <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-12 text-center shadow-sm">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Package className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                          No orders yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
                          Ready to try something delicious? Let's get you fed.
                        </p>
                        <button
                          onClick={() => navigate("/")}
                          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all"
                        >
                          Start Exploring
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <OrderCard key={order._id} order={order} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "favorites" && <Favourites />}
                {activeTab === "addresses" && <SavedAddresses />}

                {(activeTab === "payments" || activeTab === "settings") && (
                  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
                      <Star className="w-10 h-10 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white capitalize mb-2">
                      {activeTab} section
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      We're designing something beautiful here. Stay tuned!
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
