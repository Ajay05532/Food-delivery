import React, { useState, useEffect } from "react";
import { X, MapPin, ArrowLeft } from "lucide-react";
import AddressMapPicker from "./AddressMapPicker";
import { useAddress } from "../../../redux/hooks/useAddress";

const AddressModal = ({ isOpen, onClose, onSelectAddress }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    doorFlat: "",
    landmark: "",
    type: "home",
  });

  const {
    addresses,
    loading,
    error,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    clearError,
  } = useAddress();

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    onClose();
  };

  const handleAddNewAddress = async () => {
    if (newAddress.street) {
      // Construct payload matching backend schema
      const payload = {
        label:
          newAddress.type.charAt(0).toUpperCase() + newAddress.type.slice(1),
        street: newAddress.doorFlat
          ? `${newAddress.doorFlat}, ${newAddress.street}`
          : newAddress.street,
        area: "Unknown Area", // Placeholder as map picker doesn't provide this yet
        city: "Unknown City", // Placeholder
        landmark: newAddress.landmark,
        isDefault: false,
      };

      const result = await addAddress(payload);

      // Check if the action was fulfilled
      if (result.meta && result.meta.requestStatus === "fulfilled") {
        // Payload is the array of addresses, so pick the last one
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

  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Left Drawer */}
      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 z-[110] shadow-2xl w-full max-w-md overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          animation: "slideIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
        {/* Header */}
        {!showAddNew && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10 transition-colors duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-black dark:bg-gray-700 rounded-sm flex items-center justify-center mt-1">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Select delivery address
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Select from your saved addresses
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        )}

        {showAddNew && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
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
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  aria-label="Back to address selection"
                >
                  <ArrowLeft
                    size={20}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Save delivery address
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        )}

        {/* Saved Addresses */}
        {!showAddNew && (
          <div className="p-4 space-y-4">
            {loading && addresses.length === 0 ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                Loading addresses...
              </div>
            ) : (
              addresses.map((address) => (
                <div
                  key={address.id || address._id}
                  className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-800 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin
                      className="text-gray-600 dark:text-gray-400 mt-1"
                      size={18}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {address.label || address.name || "My Address"}{" "}
                        <span className="text-xs font-normal text-gray-500 uppercase ml-2">
                          ({address.type || "Home"})
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {address.doorFlat && <span>{address.doorFlat}, </span>}
                        {address.street}
                        {address.landmark && (
                          <>
                            <br />
                            Landmark: {address.landmark}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {address.deliveryTime}
                    </span>
                    <button
                      onClick={() => handleSelectAddress(address)}
                      className="px-6 py-2 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition-colors"
                    >
                      DELIVER HERE
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Add New Address Card */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <MapPin className="text-teal-500" size={16} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Add New Address
                </h3>
              </div>
              <button
                onClick={() => setShowAddNew(true)}
                className="w-full mt-3 border-2 border-teal-500 text-teal-600 dark:text-teal-400 font-bold py-2 rounded text-sm hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
              >
                ADD NEW
              </button>
            </div>
          </div>
        )}

        {/* Add New Address Form */}
        {showAddNew && (
          <div className="p-4 space-y-4">
            {/* Map Component */}
            <AddressMapPicker
              onAddressChange={(address) =>
                setNewAddress({ ...newAddress, street: address })
              }
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <textarea
                value={newAddress.street}
                readOnly
                placeholder="Move the map to select your address"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm resize-none cursor-not-allowed"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Door / Flat No.
              </label>
              <input
                type="text"
                value={newAddress.doorFlat}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, doorFlat: e.target.value })
                }
                placeholder="Enter door/flat number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Landmark
              </label>
              <input
                type="text"
                value={newAddress.landmark}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, landmark: e.target.value })
                }
                placeholder="Enter landmark"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Save as
              </label>
              <div className="flex gap-2">
                {[
                  { value: "home", icon: "🏠", label: "Home" },
                  { value: "work", icon: "💼", label: "Work" },
                  { value: "other", icon: "❤️", label: "Other" },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() =>
                      setNewAddress({ ...newAddress, type: type.value })
                    }
                    className={`flex items-center gap-1 px-3 py-2 rounded border text-sm transition-colors ${
                      newAddress.type === type.value
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 font-semibold"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  >
                    <span>{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={handleAddNewAddress}
              disabled={!newAddress.street}
              className="w-full py-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-sm"
            >
              SAVE ADDRESS & PROCEED
            </button>

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
              className="w-full py-2 text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressModal;
