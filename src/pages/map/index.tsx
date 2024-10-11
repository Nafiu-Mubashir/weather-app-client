import React from "react";

// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// import { useCtxt } from "../../context/authContext/userContext";

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

const WeatherMap: React.FC = () => {
  // const { user } = useCtxt();

  // Default location (Lagos, Nigeria) if user data is not available
  // const defaultPosition = { lat: 6.5833, lng: 3.75 };

  // Extract coordinates from user data, fallback to default
  // const userPosition = user?.weatherData?.currentWeather?.coord
  //   ? {
  //       lat: user.weatherData.currentWeather.coord.lat,
  //       lng: user.weatherData.currentWeather.coord.lon,
  //     }
  //   : defaultPosition;

  return (
    <div className="mt-6 p-3">
      <h3 className="text-xl font-semibold mb-4">Weather Map</h3>
      {/* LoadScript to load the Google Maps API */}
      {/* <LoadScript googleMapsApiKey="AIzaSyAlXDjYpC02HCV70o3bFcLEeBjo7RzEqmU">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={20}
          center={userPosition}
        >
          <Marker position={userPosition} />
        </GoogleMap>
      </LoadScript> */}
    </div>
  );
};

export default WeatherMap;
