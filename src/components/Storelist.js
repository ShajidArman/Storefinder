// src/components/StoreList.js

import React from 'react';
import '../styles/StoreList.css'; // Import CSS styles

const StoreList = ({ stores }) => {
  return (
    <div className="store-list">
      {stores.length === 0 ? (
        <p className="no-stores">No stores to display. Enter a location to find nearby stores.</p>
      ) : (
        <>
          <h2>Nearest Stores</h2>
          <div className="store-items">
            {stores.map((store, index) => (
              <div key={store.id} className={`store-box ${index % 2 === 0 ? 'blue-bg' : 'white-bg'}`}>
                <h3>{store.name}</h3>
                <p>{store.address}</p>
                <p><strong>Phone:</strong> {store.phone}</p>
                <p><strong>Email:</strong> {store.email}</p>
                <p><strong>Distance:</strong> {store.distance.toFixed(2)} km</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StoreList;
