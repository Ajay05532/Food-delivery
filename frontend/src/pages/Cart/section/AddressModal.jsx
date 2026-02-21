import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  MapPin,
  ArrowLeft,
  Loader2,
  Home,
  Briefcase,
  Heart,
} from "lucide-react";
import AddressMapPicker from "./AddressMapPicker";
import { useAddress } from "../../../redux/hooks/useAddress";
import { motion, AnimatePresence } from "framer-motion";

const AddressModal = ({ isOpen, onClose, onSelectAddress }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    doorFlat: "",
    landmark: "",
    type: "home",
  });

  const { addresses, loading, error, getAddresses, addAddress } = useAddress();

  useEffect(() => {
    if (isOpen) getAddresses();
  }, [isOpen, getAddresses]);

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    onClose();
  };

  const handleAddNewAddress = async () => {
    if (newAddress.street) {
      const payload = {
        label:
          newAddress.type.charAt(0).toUpperCase() + newAddress.type.slice(1),
        street: newAddress.doorFlat
          ? `${newAddress.doorFlat}, ${newAddress.street}`
          : newAddress.street,
        area: newAddress.area || "",
        city: newAddress.city || "",
        landmark: newAddress.landmark,
        isDefault: false,
      };

      const result = await addAddress(payload);

      if (result.meta && result.meta.requestStatus === "fulfilled") {
        const addedAddress = Array.isArray(result.payload)
          ? result.payload[result.payload.length - 1]
          : result.payload;
        onSelectAddress(addedAddress);
        setShowAddNew(false);
        setNewAddress({
          name: "",
          street: "",
          doorFlat: "",
          landmark: "",
          type: "home",
        });
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  const renderContent = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl z-[10000] shadow-2xl w-full max-w-md overflow-hidden flex flex-col border-l border-white/20 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800/60 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-500/5 z-10 shrink-0">
              <div className="flex items-center gap-4">
                {showAddNew ? (
                  <button
                    onClick={() => {
                      setShowAddNew(false);
                      setNewAddress({
                        name: "",
                        street: "",
                        doorFlat: "",
                        landmark: "",
                        type: "home",
                      });
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors active:scale-95 text-gray-700 dark:text-gray-300"
                  >
                    <ArrowLeft size={22} />
                  </button>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {showAddNew ? "Save New Address" : "Delivery Address"}
                  </h2>
                  {!showAddNew && (
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                      Select from saved addresses
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors active:scale-95"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {!showAddNew ? (
                // --- SAVED ADDRESSES ---
                <AnimatePresence mode="wait">
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Add New Button Card */}
                    <button
                      onClick={() => setShowAddNew(true)}
                      className="w-full group relative overflow-hidden flex items-center gap-4 p-5 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-500/10 transition-all text-left"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 group-hover:bg-orange-500/20 text-gray-400 group-hover:text-orange-500 flex items-center justify-center transition-colors">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          Add New Address
                        </h3>
                        <p className="text-xs font-medium text-gray-500">
                          Deliver to a different location
                        </p>
                      </div>
                    </button>

                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-800" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white dark:bg-gray-900 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest rounded-full">
                          Saved Addresses
                        </span>
                      </div>
                    </div>

                    {loading && addresses.length === 0 ? (
                      <div className="flex justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                      </div>
                    ) : addresses.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-sm font-medium text-gray-500">
                          No saved addresses found.
                        </p>
                      </div>
                    ) : (
                      addresses.map((address, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={address.id || address._id}
                          className="group border-2 border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleSelectAddress(address)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-gray-700 text-orange-500 flex items-center justify-center shrink-0">
                              {address.type === "work" ? (
                                <Briefcase className="w-5 h-5" />
                              ) : address.type === "other" ? (
                                <Heart className="w-5 h-5" />
                              ) : (
                                <Home className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-extrabold text-gray-900 dark:text-white text-base mb-1 group-hover:text-orange-500 transition-colors">
                                {address.label || address.name || "Home"}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4 line-clamp-2">
                                {address.doorFlat && `${address.doorFlat}, `}
                                {address.street}{" "}
                                {address.landmark &&
                                  `(Near ${address.landmark})`}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400">
                                  {address.deliveryTime || "30 MINS"}
                                </span>
                                <button className="font-extrabold text-xs text-orange-500 uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                  Deliver Here
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                // --- ADD NEW ADDRESS FORM ---
                <AnimatePresence mode="wait">
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6 pb-20"
                  >
                    <div className="rounded-3xl overflow-hidden border-2 border-orange-100 dark:border-gray-800 shadow-xl">
                      <AddressMapPicker
                        onAddressChange={(address, details) => {
                          setNewAddress((prev) => ({
                            ...prev,
                            street: address,
                            city: details?.city || "",
                            area: details?.area || "",
                            state: details?.state || "",
                            pincode: details?.postcode || "",
                            country: details?.country || "",
                          }));
                        }}
                      />
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Location Information
                        </label>
                        <textarea
                          value={newAddress.street}
                          readOnly
                          placeholder="Move map to pinpoint location"
                          className="w-full px-4 py-3 border-2 border-transparent rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium resize-none cursor-not-allowed shadow-sm focus:outline-none"
                          rows="2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Door / Flat No.
                          </label>
                          <input
                            type="text"
                            value={newAddress.doorFlat}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                doorFlat: e.target.value,
                              })
                            }
                            placeholder="e.g. 402"
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold transition-colors shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Landmark
                          </label>
                          <input
                            type="text"
                            value={newAddress.landmark}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                landmark: e.target.value,
                              })
                            }
                            placeholder="e.g. Near Mall"
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold transition-colors shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                          Save As
                        </label>
                        <div className="flex gap-3">
                          {[
                            { value: "home", icon: Home, label: "Home" },
                            { value: "work", icon: Briefcase, label: "Work" },
                            { value: "other", icon: Heart, label: "Other" },
                          ].map((type) => {
                            const Icon = type.icon;
                            const isActive = newAddress.type === type.value;
                            return (
                              <button
                                key={type.value}
                                onClick={() =>
                                  setNewAddress({
                                    ...newAddress,
                                    type: type.value,
                                  })
                                }
                                className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all ${isActive ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" : "border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900"}`}
                              >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-bold">
                                  {type.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {showAddNew && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <button
                  onClick={handleAddNewAddress}
                  disabled={!newAddress.street}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:shadow-none active:scale-95 tracking-wide"
                >
                  SAVE & PROCEED
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(renderContent(), document.body);
};

export default AddressModal;
