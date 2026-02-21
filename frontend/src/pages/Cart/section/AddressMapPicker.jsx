import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Track map center when user drags
function CenterTracker({ setCoords }) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      setCoords({
        lat: center.lat,
        lng: center.lng,
      });
    },
  });
  return null;
}

// Animate map to target location
function MapController({ targetLocation }) {
  const map = useMapEvents({});

  useEffect(() => {
    if (targetLocation) {
      map.flyTo([targetLocation.lat, targetLocation.lng], 17);
    }
  }, [targetLocation, map]);

  return null;
}

const AddressMapPicker = ({ onAddressChange }) => {
  const [coords, setCoords] = useState({
    lat: 28.6315,
    lng: 77.2167,
  });

  const [address, setAddress] = useState("Move map to select address");
  const [targetLocation, setTargetLocation] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Reverse geocoding
  const fetchAddress = async (lat, lng) => {
    setIsLoadingAddress(true);
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      );
      const data = res.data;
      const fetchedAddress = data.display_name || "Address not found";
      setAddress(fetchedAddress);

      // Extract details
      const addressDetails = {
        label: "Home", // Default
        street: fetchedAddress,
        city:
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.municipality ||
          data.address?.city_district ||
          data.address?.county ||
          data.address?.state_district ||
          "",
        area:
          data.address?.suburb ||
          data.address?.neighbourhood ||
          data.address?.quarter ||
          data.address?.residential ||
          data.address?.industrial ||
          data.address?.hamlet ||
          "",
        state: data.address?.state || "",
        postcode: data.address?.postcode || "",
        country: data.address?.country || "",
      };

      // Pass address details to parent component
      if (onAddressChange) {
        onAddressChange(fetchedAddress, addressDetails);
      }
    } catch {
      setAddress("Unable to fetch address");
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Debounced address fetch
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAddress(coords.lat, coords.lng);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [coords]);

  // Get GPS location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newLocation = { lat: latitude, lng: longitude };

        setCoords(newLocation);
        setTargetLocation(newLocation);

        // allow manual movement again
        setTimeout(() => setTargetLocation(null), 1000);
      },
      () => alert("Location access denied"),
    );
  };

  return (
    <div className="w-full h-full relative">
      {/* Map */}
      <div className="relative w-full h-72 z-0">
        <MapContainer center={coords} zoom={17} className="h-full w-full z-0">
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController targetLocation={targetLocation} />
          <CenterTracker setCoords={setCoords} />
          <Marker position={coords} />
        </MapContainer>

        {/* Floating Current Location Button */}
        <button
          onClick={getCurrentLocation}
          className="absolute bottom-6 right-4 z-[1000] bg-white dark:bg-gray-900 text-black dark:text-white p-3 rounded-2xl shadow-xl hover:shadow-orange-500/30 hover:text-orange-500 transition-all border border-gray-100 dark:border-gray-800 flex items-center justify-center active:scale-95"
          title="Go to current location"
          type="button"
        >
          📍
        </button>
      </div>
    </div>
  );
};

export default AddressMapPicker;
