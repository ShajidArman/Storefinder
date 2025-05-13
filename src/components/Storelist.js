// src/components/StoreList.js

import React from 'react';
import '../styles/StoreList.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaGlobe, FaMapPin } from 'react-icons/fa';

const StoreList = ({ stores, onStoreClick }) => {
  return (
    <div className="store-list">
      <div className="store-items">
        {stores.map((store) => (
          <div
            key={store.id}
            className="store-box"
            onClick={() => onStoreClick(store)}
          >
            {/* ✅ Distance at Top Right */}
            {store.distance && (
              <div className="distance-container">
                <FaMapMarkerAlt className="distance-icon" />
                <span>{store.distance.toFixed(2)} km</span>
              </div>
            )}

            {/* ✅ Store Name with Gold Star for Exclusive Stores */}
            <h3>
              {store.isExclusive && <FaStar className="gold-star" />} {/* ⭐ Gold Star */}
              {store.name}
            </h3>

            <p>{store.address}</p>
            <p><FaPhone className="icon" /> {store.phone}</p>
            <p><FaEnvelope className="icon" /> <a href={`mailto:${store.email}`} className="email-link">{store.email}</a></p>

            {/*Adding website and Google map location*/}
            <div className="store-links">
              {store.website && (
                <a href={store.website} target="_blank" rel="noopener noreferrer" className="website-link">
                  <FaGlobe className="icon" /> View Website
                </a>
              )}
              {store.googleMapsUrl && (
                <a href={store.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="map-link">
                  <FaMapPin className="icon" /> Google Map
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
