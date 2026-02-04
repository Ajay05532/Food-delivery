import React, { useState } from "react";
import { X, MapPin, ArrowLeft } from "lucide-react";
import AddressMapPicker from "./AddressMapPicker";

const AddressModal = ({ isOpen, onClose, onSelectAddress }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    doorFlat: "",
    landmark: "",
    type: "home",
  });

  const [savedAddresses] = useState([
    {
      id: 1,
      name: "Friends And Family",
      street: "Flat No 204, Kaveriappa Layout,",
      street2: "Kasubessanahalli, Bengaluru,",
      street3: "Karnataka, India",
      doorFlat: "Flat No 204",
      type: "home",
      landmark: "Kaveriappa Layout",
      deliveryTime: "48 MINS",
    },
  ]);

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    onClose();
  };

  const handleAddNewAddress = () => {
    if (newAddress.street && newAddress.name) {
      const addressToAdd = {
        id: savedAddresses.length + 1,
        ...newAddress,
        deliveryTime: "45 MINS",
      };
      onSelectAddress(addressToAdd);
      setShowAddNew(false);
      setNewAddress({ name: "", street: "", doorFlat: "", landmark: "", type: "home" });
      onClose();
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
        className={`fixed left-0 top-0 h-full bg-white z-[110] shadow-2xl w-full max-w-md overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          animation: 'slideIn 0.3s ease-out'
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
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center mt-1">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Select delivery address</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    You have a saved address in this location
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {showAddNew && (
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowAddNew(false);
                    setNewAddress({ name: "", street: "", doorFlat: "", landmark: "", type: "home" });
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Back to address selection"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg font-bold text-gray-900">Save delivery address</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Saved Addresses */}
        {!showAddNew && (
          <div className="p-4 space-y-4">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 rounded-md p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="text-gray-600 mt-1" size={18} />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {address.street}
                      <br />
                      {address.street2}
                      <br />
                      {address.street3}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
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
            ))}

            {/* Add New Address Card */}
            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <MapPin className="text-teal-500" size={16} />
                </div>
                <h3 className="font-semibold text-gray-900">Add New Address</h3>
              </div>
              <button
                onClick={() => setShowAddNew(true)}
                className="w-full mt-3 border-2 border-teal-500 text-teal-600 font-bold py-2 rounded text-sm hover:bg-teal-50 transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={newAddress.street}
                readOnly
                placeholder="Move the map to select your address"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700 text-sm resize-none cursor-not-allowed"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Door / Flat No.
              </label>
              <input
                type="text"
                value={newAddress.doorFlat}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, doorFlat: e.target.value })
                }
                placeholder="Enter door/flat number"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landmark
              </label>
              <input
                type="text"
                value={newAddress.landmark}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, landmark: e.target.value })
                }
                placeholder="Enter landmark"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none text-sm"
              />
            </div>

            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
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
              disabled={!newAddress.name || !newAddress.street}
              className="w-full py-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              SAVE ADDRESS & PROCEED
            </button>

            <button
              onClick={() => {
                setShowAddNew(false);
                setNewAddress({ name: "", street: "", doorFlat: "", landmark: "", type: "home" });
              }}
              className="w-full py-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
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