import React, { useState } from "react";
import { X, MapPin, Home, Briefcase, MoreHorizontal } from "lucide-react";

const AddressModal = ({ isOpen, onClose, onSelectAddress }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    doorFlat: "",
    landmark: "",
    type: "home",
  });

  const [savedAddresses] = useState([
    {
      id: 1,
      street: "J6M9+3WQ, Inner Cir, Connaught Place...",
      doorFlat: "Flat 4B",
      type: "home",
      landmark: "Near PVR Cinema",
    },
    {
      id: 2,
      street: "123 Business District, Sector 15",
      doorFlat: "Office 301",
      type: "work",
      landmark: "Near Metro Station",
    },
  ]);

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    onClose();
  };

  const handleAddNewAddress = () => {
    if (newAddress.street) {
      const addressToAdd = {
        id: savedAddresses.length + 1,
        ...newAddress,
      };
      onSelectAddress(addressToAdd);
      setShowAddNew(false);
      setNewAddress({ street: "", doorFlat: "", landmark: "", type: "home" });
      onClose();
    }
  };

  if (!isOpen) return null;

  const getAddressIcon = (type) => {
    switch (type) {
      case "home":
        return <Home size={20} />;
      case "work":
        return <Briefcase size={20} />;
      default:
        return <MapPin size={20} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Select Address</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Saved Addresses */}
        {!showAddNew && (
          <div className="p-6 space-y-4">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                onClick={() => handleSelectAddress(address)}
                className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-600 group-hover:text-orange-500">
                      {getAddressIcon(address.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">
                        {address.type}
                      </p>
                      <p className="text-xs text-gray-500">{address.street}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={18} className="text-gray-500" />
                  </button>
                </div>

                {address.doorFlat && (
                  <p className="text-sm text-gray-600 ml-8 mb-1">
                    Door/Flat: {address.doorFlat}
                  </p>
                )}
                {address.landmark && (
                  <p className="text-sm text-gray-600 ml-8">
                    Landmark: {address.landmark}
                  </p>
                )}
              </div>
            ))}

            {/* Add New Address Button */}
            <button
              onClick={() => setShowAddNew(true)}
              className="w-full border-2 border-teal-500 text-teal-600 font-bold py-3 rounded-lg hover:bg-teal-50 transition-colors text-base mt-6"
            >
              + ADD NEW ADDRESS
            </button>
          </div>
        )}

        {/* Add New Address Form */}
        {showAddNew && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                placeholder="Enter street address"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Door / Flat No.
              </label>
              <input
                type="text"
                value={newAddress.doorFlat}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, doorFlat: e.target.value })
                }
                placeholder="Enter door/flat number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Landmark
              </label>
              <input
                type="text"
                value={newAddress.landmark}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, landmark: e.target.value })
                }
                placeholder="Enter landmark"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Address Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Address Type
              </label>
              <div className="flex gap-4">
                {["home", "work", "other"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setNewAddress({ ...newAddress, type })
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
                      newAddress.type === type
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {getAddressIcon(type)}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddNew(false);
                  setNewAddress({ street: "", doorFlat: "", landmark: "", type: "home" });
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewAddress}
                className="flex-1 px-4 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
              >
                SAVE ADDRESS & PROCEED
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressModal;