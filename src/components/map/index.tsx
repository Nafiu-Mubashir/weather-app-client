// // src/components/MapComponent.tsx

// import "leaflet/dist/leaflet.css";

// import { LatLngExpression } from "leaflet";
// import React, { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// interface MapComponentProps {
//   lat: number;
//   lon: number;
//   city: string;
// }

// const MapComponent: React.FC<MapComponentProps> = ({ lat, lon, city }) => {
//   const [position, setPosition] = useState<LatLngExpression>([lat, lon]);

//   const UpdateMap = () => {
//     const map = useMap();
//     map.setView(position, map.getZoom());
//     return null;
//   };

//   useEffect(() => {
//     setPosition([lat, lon]);
//   }, [lat, lon]);

//   return (
//     <MapContainer
//       center={position}
//       zoom={10}
//       style={{ height: "400px", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <UpdateMap />
//       <Marker position={position}>
//         <Popup>{city}</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;
