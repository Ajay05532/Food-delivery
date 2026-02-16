import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import {
  Clock,
  MapPin,
  CheckCircle,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

const Order = () => {
  const dispatch = useDispatch();
  const {
    items: orders,
    loading,
    error,
  } = useSelector((state) => state.orders);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated]);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800";
      case "cancelled":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800";
      case "out_for_delivery":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800";
      default:
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      case "out_for_delivery":
        return <Truck size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 bg-white dark:bg-gray-900 transition-colors duration-300">
        Error loading orders: {error}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Please Login
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You need to be logged in to view your orders
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center transition-colors duration-300">
            <div className="flex justify-center mb-4">
              <Package size={48} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Looks like you haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md duration-300"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                        {order.restaurant?.coverImage ? (
                          <img
                            src={order.restaurant.coverImage}
                            alt={order.restaurant.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                            <Package className="text-gray-400 dark:text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate">
                          {order.restaurant?.name || "Unknown Restaurant"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                          <MapPin size={12} className="flex-shrink-0" />{" "}
                          <span className="truncate">
                            {order.restaurant?.address?.area ||
                              order.restaurant?.address}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 sm:gap-1 mt-2 sm:mt-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-4 space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.quantity}x
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      Total Amount
                    </span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                  {/* You can add action buttons here like "Reorder" or "Track Order" */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
