import "leaflet/dist/leaflet.css";

import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useCtxt } from "../../context/authContext/userContext";

// Set up a default Leaflet marker icon (Leaflet uses images not bundled in React projects)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const WeatherMap: React.FC = () => {
  const { user } = useCtxt();

  // Default location if no user data is available
  const defaultPosition = [6.5833, 3.75]; // Lagos coordinates

  // Coordinates from user weather data
  const userPosition = user?.weatherData?.currentWeather?.coord
    ? [
        user.weatherData.currentWeather.coord.lat,
        user.weatherData.currentWeather.coord.lon,
      ]
    : defaultPosition;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Weather Map</h3>
      <MapContainer
        center={userPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-[400px] lg:h-[600px]">
        {/* TileLayer provides the base map. OpenStreetMap is free to use */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker for the user's location */}
        <Marker position={userPosition}>
          <Popup>
            {user?.weatherData.currentWeather.name},{" "}
            {user?.weatherData.currentWeather.sys.country}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
