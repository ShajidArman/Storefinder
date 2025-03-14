// src/components/StoreLocator.js

import React, { useState } from 'react';
import StoreList from './Storelist';
import MapView from './MapView';
import Select from 'react-select';

const storeLocations = [
  {
    id: 1,
    name: 'Coatings and Waterproofing Center - Aguascalientes',
    address: 'Aguascalientes West Avenue # 122, Primo Verdad, Aguascalientes, CP 21300',
    phone: '(449) 9124 685',
    email: 'cecy_robles@live.com',
    lat: 21.8853,
    lng: -102.2916,
    isExclusive: true, // ✅ Marked as exclusive
  },
  {
    id: 2,
    name: 'Coatings and Waterproofing Center - 21st Century',
    address: 'Av. Century 21 # 3214, Villas del Pilar, Aguascalientes, CP 20286',
    phone: '(449) 1747410',
    email: 'cecy_robles@live.com',
    lat: 21.8847,
    lng: -102.2914,
    isExclusive: false,
  },
  {
    id: 3,
    name: 'Imac - San Cayetano',
    address: 'University Avenue # 210, San Cayetano, Aguascalientes, CP 20100',
    phone: '9144435',
    email: 'sales-suc-norte-1@imacags.com',
    lat: 21.8969,
    lng: -102.2920,
    isExclusive: false,
  },
  {
    id: 4,
    name: 'Imac - St. Helena',
    address: '1914 South Convention Avenue # 905, Sta. Elena, Aguascalientes, CP 20230',
    phone: '9171207',
    email: 'sales-suc-sur-1@imacags.com',
    lat: 21.8834,
    lng: -102.2925,
    isExclusive: true, // ✅ Marked as exclusive
  },
  {
    id: 5,
    name: 'Protomar - Ensenada',
    address: 'C. Iturbide #486, Col. Obrera, CP 22830, Ensenada BC',
    phone: '(646) 177 2440',
    email: 'festerprotomar2023@gmail.com',
    lat: 31.8667,
    lng: -116.5964,
    isExclusive: true, // ✅ Marked as exclusive
  },
  {
    id: 6,
    name: 'Fester Distribution Center',
    address: 'Av. Cairo No. 1101, Col. Villafontana, Mexicali, CP 21180',
    phone: '(662) 471 2777',
    email: 'ssolutionsindustrial@gmail.com',
    lat: 32.6245,
    lng: -115.4523,
    isExclusive: false,
  },
  {
    id: 7,
    name: 'Protomar - Mexicali',
    address: 'Calz. de las Americas #999-6, Compuertas Neighborhood, CP 21218, Mexicali, BC',
    phone: '(686) 564 8488',
    email: 'festerprotomar2023@gmail.com',
    lat: 32.6278,
    lng: -115.4421,
    isExclusive: true, // ✅ Marked as exclusive
  },
  {
    id: 8,
    name: 'Materials and Finishes',
    address: 'Av. Ignacio Comonfort 802, Col. Prohogar, CP 21240, Mexicali',
    phone: '(686) 946 3707 / (686) 290 6566',
    email: 'suppliescachanilla@gmail.com , migue2684@hotmail.com',
    lat: 32.6501,
    lng: -115.4557,
    isExclusive: false,
  },
];

/// Function to calculate distance using Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const StoreLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStores, setNearestStores] = useState(storeLocations);
  const [selectedStore, setSelectedStore] = useState(null);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filterType, setFilterType] = useState('nearest'); // ✅ Default filter

  const handleSearchChange = async (value) => {
    setInputValue(value);
    if (value.length < 3) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data = await response.json();

      const locationOptions = data.map((place) => ({
        value: { lat: parseFloat(place.lat), lng: parseFloat(place.lon) },
        label: place.display_name,
      }));

      setOptions(locationOptions);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleLocationSelect = (selectedOption) => {
    if (!selectedOption) return;

    const newLocation = selectedOption.value;
    setUserLocation(newLocation);

    const storesWithDistance = storeLocations.map((store) => ({
      ...store,
      distance: haversineDistance(newLocation.lat, newLocation.lng, store.lat, store.lng),
    }));

    storesWithDistance.sort((a, b) => a.distance - b.distance);
    setNearestStores(storesWithDistance);
  };

  // ✅ Click on store address to highlight it on the map
  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  // ✅ Handle Filter Change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter);

    if (selectedFilter === 'exclusive') {
      setNearestStores(storeLocations.filter((store) => store.isExclusive));
    } else {
      setNearestStores(storeLocations);
    }
  };

  return (
    <div className="store-locator">
      <div className="store-locator-left">
        <h2>Enter Your Location</h2>
        <Select
          placeholder="Type a location..."
          inputValue={inputValue}
          onInputChange={(value) => handleSearchChange(value)}
          onChange={handleLocationSelect}
          options={options}
          isClearable
        />

        {/* ✅ Filter Dropdown */}
        <select className="filter-dropdown" onChange={handleFilterChange} value={filterType}>
          <option value="nearest">Nearest Stores</option>
          <option value="exclusive">Exclusive Stores</option>
        </select>

        <StoreList stores={nearestStores} onStoreClick={handleStoreClick} />
      </div>
      <div className="store-locator-right">
        <MapView userLocation={userLocation} stores={nearestStores} selectedStore={selectedStore} />
      </div>
    </div>
  );
};

export default StoreLocator;
