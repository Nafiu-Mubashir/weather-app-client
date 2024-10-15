import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

import { RootState } from "../../lib"; // Import the root state from your store

const mapContainerStyle = {
  width: "100%", // Full-width container
  height: "500px", // Increased height for the map
};

const WeatherMap: React.FC = () => {
  // Access weather data from Redux store
  const { weatherData } = useSelector((state: RootState) => state.weatherSlice);

  // Default location (Lagos, Nigeria) if user data is not available
  const defaultPosition = { lat: 6.5833, lng: 3.75 };

  // Extract coordinates from weatherData if available, fallback to default
  const userPosition = weatherData?.weatherData?.currentWeather?.coord
    ? {
        lat: weatherData.weatherData.currentWeather.coord.lat,
        lng: weatherData.weatherData.currentWeather.coord.lon,
      }
    : defaultPosition;

  // Extract city name from weatherData
  const locationName =
    weatherData?.weatherData?.currentWeather?.name || "Unknown Location";

  // State for handling the info window visibility
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  return (
    <div className="mt- p-3">
      <h3 className="text-xl font-semibold mb-4">Weather Map</h3>

      {/* Load Google Maps with API Key */}
      <LoadScript googleMapsApiKey="AIzaSyAlXDjYpC02HCV70o3bFcLEeBjo7RzEqmU">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10} // Adjusted zoom level for better visibility
          center={userPosition} // Center map on user's position or default
        >
          {/* Marker placed at the user's location */}
          <Marker
            position={userPosition}
            onClick={() => setShowInfoWindow(!showInfoWindow)} // Toggle info window on marker click
          />

          {showInfoWindow && (
            <InfoWindow
              position={userPosition}
              onCloseClick={() => setShowInfoWindow(false)} // Close info window on clicking "x"
            >
              <div>
                <h4>{locationName}</h4>
                <p>
                  Lat: {userPosition.lat}, Lng: {userPosition.lng}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default WeatherMap;
