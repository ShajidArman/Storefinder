// src/components/MapView.js

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Fix for missing Leaflet markers
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Ensure Leaflet Uses Correct Default Icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

// ✅ Custom Red Marker for User Location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ✅ Default Blue Marker for Store Locations
const storeIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapView = ({ userLocation, stores }) => {
  const mapRef = useRef(null);

  // Function to update the map view dynamically when user enters location
  const UpdateMapView = () => {
    const map = useMap();
    useEffect(() => {
      if (userLocation) {
        map.setView([userLocation.lat, userLocation.lng], 12); // Zoom to user location
      }
    }, [userLocation, map]);
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer ref={mapRef} center={[21.8853, -102.2916]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Automatically update the map view when userLocation changes */}
        <UpdateMapView />

        {/* Show all store markers from the start */}
        {stores.map((store) => (
          <Marker key={store.id} position={[store.lat, store.lng]} icon={storeIcon}>
            <Popup>
              <strong>{store.name}</strong>
              <br />
              {store.address}
              <br />
              <strong>Distance:</strong> {store.distance?.toFixed(2)} km
            </Popup>
          </Marker>
        ))}

        {/* Show user location with a red marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup><strong>You are here</strong></Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
