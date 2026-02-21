import React, { useEffect, useState } from "react";
import { useAddress } from "../../../redux/hooks/useAddress";
import {
  MapPin,
  Home,
  Briefcase,
  Star,
  Trash2,
  Plus,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* ─── Label icons ─────────────── */
const LabelIcon = ({ label }) => {
  if (label === "Work") return <Briefcase className="w-4 h-4" />;
  if (label === "Home") return <Home className="w-4 h-4" />;
  return <Star className="w-4 h-4" />;
};

const LABEL_COLORS = {
  Home: "bg-blue-50 text-blue-600 border-blue-200",
  Work: "bg-purple-50 text-purple-600 border-purple-200",
  Other: "bg-gray-50 text-gray-600 border-gray-200",
};

/* ─── Empty form state ─────────── */
const BLANK = {
  label: "Home",
  street: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

const SavedAddresses = () => {
  const {
    addresses,
    loading,
    error,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.street || !form.area || !form.city) return;
    setSaving(true);
    await addAddress({ ...form });
    setSaving(false);
    setShowForm(false);
    setForm(BLANK);
    getAddresses();
  };

  const handleSetDefault = async (address) => {
    // Clear all defaults, then set selected one
    for (const addr of addresses) {
      if (addr._id !== address._id && addr.isDefault) {
        await updateAddress({ ...addr, isDefault: false });
      }
    }
    await updateAddress({ ...address, isDefault: true });
    getAddresses();
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteAddress(id);
    setDeletingId(null);
    getAddresses();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 border border-orange-400 hover:border-orange-500 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          ADD NEW
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {/* ── Add New Form ── */}
      {showForm && (
        <div className="bg-white border-2 border-orange-400 rounded-xl p-5 mb-4 space-y-3">
          <h3 className="font-bold text-gray-800 mb-1">New Address</h3>

          {/* Label selector */}
          <div className="flex gap-2">
            {["Home", "Work", "Other"].map((l) => (
              <button
                key={l}
                onClick={() => setForm((p) => ({ ...p, label: l }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors
                  ${
                    form.label === l
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 text-gray-600 hover:border-orange-300"
                  }`}
              >
                <LabelIcon label={l} /> {l}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Street / Flat *
              </label>
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Door no, building, street"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Area *
              </label>
              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Area / locality"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                City *
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                State
              </label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Pincode
              </label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Landmark
              </label>
              <input
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Near landmark (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={saving || !form.street || !form.area || !form.city}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              SAVE ADDRESS
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setForm(BLANK);
              }}
              className="text-gray-500 hover:text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Address list ── */}
      {loading && addresses.length === 0 ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No saved addresses yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Click "ADD NEW" to add your first address
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`bg-white rounded-xl border-2 p-5 transition-all ${
                addr.isDefault
                  ? "border-orange-400 shadow-sm"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-full border ${LABEL_COLORS[addr.label] || LABEL_COLORS.Other} flex-shrink-0`}
                  >
                    <LabelIcon label={addr.label} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-800 text-sm">
                        {addr.label || "Address"}
                      </span>
                      {addr.isDefault && (
                        <span className="flex items-center gap-1 text-xs text-orange-600 font-semibold bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {[
                        addr.street,
                        addr.area,
                        addr.city,
                        addr.state,
                        addr.pincode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {addr.landmark && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        Near: {addr.landmark}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr)}
                      className="text-xs text-orange-500 font-bold border border-orange-300 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(addr._id)}
                    disabled={deletingId === addr._id}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    {deletingId === addr._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddresses;
