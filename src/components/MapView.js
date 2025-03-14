// src/components/MapView.js

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Import default Leaflet marker icons
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// ✅ Fix Leaflet's missing marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

// ✅ Create a custom red marker by adjusting default Leaflet marker
const selectedStoreIcon = new L.Icon({
  iconUrl: markerIconPng, // ✅ Uses default blue marker
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadowPng,
  className: "red-marker", // ✅ Apply CSS filter
});

// ✅ Default Blue Marker for Other Stores
const storeIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadowPng,
});

const MapView = ({ userLocation, stores, selectedStore }) => {
  const mapRef = useRef(null);

  // ✅ Ensure Map Recenters Correctly
  const UpdateMapView = () => {
    const map = useMap();
    useEffect(() => {
      if (selectedStore) {
        map.setView([selectedStore.lat, selectedStore.lng], 14, { animate: true });
      } else if (userLocation) {
        map.setView([userLocation.lat, userLocation.lng], 12);
      } else if (stores.length > 0) {
        const bounds = L.latLngBounds(stores.map(store => [store.lat, store.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [selectedStore, userLocation, stores, map]);
    return null;
  };

  return (
    <MapContainer ref={mapRef} center={[21.8853, -102.2916]} zoom={6} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <UpdateMapView />
      
      {/* ✅ Show store markers, highlight selected store */}
      {stores.map((store) => (
        <Marker 
          key={store.id} 
          position={[store.lat, store.lng]} 
          icon={selectedStore?.id === store.id ? selectedStoreIcon : storeIcon} // ✅ Fix: Highlight selected marker
        >
          <Popup><strong>{store.name}</strong><br />{store.address}</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default MapView;
