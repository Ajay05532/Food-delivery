import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

function MapController({ targetLocation }) {
  const map = useMapEvents({});
  
  useEffect(() => {
    if (targetLocation) {
      map.flyTo([targetLocation.lat, targetLocation.lng], 10);
    }
  }, [targetLocation, map]);
  
  return null;
}

const Order = () => {
  const [coords, setCoords] = useState({
    lat: 28.6315,
    lng: 77.2167,
  });

  const [address, setAddress] = useState("Move map to select address");
  const [targetLocation, setTargetLocation] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const fetchAddress = async (lat, lng) => {
    setIsLoadingAddress(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      setAddress(data.display_name || "Address not found");
    } catch {
      setAddress("Unable to fetch address");
    } finally {
      setIsLoadingAddress(false);
    }
  };

  useEffect(() => {
    // Debounce address fetching to avoid too many API calls while dragging
    const timeoutId = setTimeout(() => {
      fetchAddress(coords.lat, coords.lng);
    }, 500); // Wait 500ms after user stops moving the map

    return () => clearTimeout(timeoutId);
  }, [coords]);

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
        
        // Reset target after animation to allow manual movement
        setTimeout(() => setTargetLocation(null), 1000);
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Select delivery location
          </h2>
          <p className="text-sm text-gray-500">
            Move the map to adjust your location
          </p>
        </div>

        {/* Button */}
        <div className="p-4">
          <button
            onClick={getCurrentLocation}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition"
          >
            📍 Use my current location
          </button>
        </div>

        {/* Map */}
        <div className="relative">
          <MapContainer
            center={coords}
            zoom={17}
            className="h-[350px] w-full"
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController targetLocation={targetLocation} />
            <CenterTracker setCoords={setCoords} />
            <Marker position={coords} />
          </MapContainer>
        </div>

        {/* Address Card */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Delivery Address
          </p>
          <p className="text-sm text-gray-800 leading-snug">
            {isLoadingAddress ? (
              <span className="text-gray-400 italic">Updating address...</span>
            ) : (
              address
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
