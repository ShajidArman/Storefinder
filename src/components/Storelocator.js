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
  },
  {
    id: 2,
    name: 'Coatings and Waterproofing Center - 21st Century',
    address: 'Av. Century 21 # 3214, Villas del Pilar, Aguascalientes, CP 20286',
    phone: '(449) 1747410',
    email: 'cecy_robles@live.com',
    lat: 21.8847,
    lng: -102.2914,
  },
  {
    id: 3,
    name: 'Imac - San Cayetano',
    address: 'University Avenue # 210, San Cayetano, Aguascalientes, CP 20100',
    phone: '9144435',
    email: 'sales-suc-norte-1@imacags.com',
    lat: 21.8969,
    lng: -102.2920,
  },
  {
    id: 4,
    name: 'Imac - St. Helena',
    address: '1914 South Convention Avenue # 905, Sta. Elena, Aguascalientes, CP 20230',
    phone: '9171207',
    email: 'sales-suc-sur-1@imacags.com',
    lat: 21.8834,
    lng: -102.2925,
  },
  {
    id: 5,
    name: 'Protomar - Ensenada',
    address: 'C. Iturbide #486, Col. Obrera, CP 22830, Ensenada BC',
    phone: '(646) 177 2440',
    email: 'festerprotomar2023@gmail.com',
    lat: 31.8667,
    lng: -116.5964,
  },
  {
    id: 6,
    name: 'Fester Distribution Center',
    address: 'Av. Cairo No. 1101, Col. Villafontana, Mexicali, CP 21180',
    phone: '(662) 471 2777',
    email: 'ssolutionsindustrial@gmail.com',
    lat: 32.6245,
    lng: -115.4523,
  },
  {
    id: 7,
    name: 'Protomar - Mexicali',
    address: 'Calz. de las Americas #999-6, Compuertas Neighborhood, CP 21218, Mexicali, BC',
    phone: '(686) 564 8488',
    email: 'festerprotomar2023@gmail.com',
    lat: 32.6278,
    lng: -115.4421,
  },
  {
    id: 8,
    name: 'Materials and Finishes',
    address: 'Av. Ignacio Comonfort 802, Col. Prohogar, CP 21240, Mexicali',
    phone: '(686) 946 3707 / (686) 290 6566',
    email: 'suppliescachanilla@gmail.com , migue2684@hotmail.com',
    lat: 32.6501,
    lng: -115.4557,
  },
  {
    id: 9,
    name: 'Over The Cover',
    address: 'BIT Center, Blvd. Diaz Ordaz #12415 Int. M5-17, Col. El Paraiso, CP 22106, Tijuana, BC',
    phone: '(664) 155 7185',
    email: 'hello@festerarrecife.com',
    lat: 32.5149,
    lng: -117.0382,
  },
  {
    id: 10,
    name: 'Low Festival',
    address: 'Blvd. Federico Benitez Lopez #100-1, Col. El Pedregal Oeste, CP 22104, Tijuana, BC',
    phone: '(664) 622 4587',
    email: 'festerbaja@gmail.com',
    lat: 32.5061,
    lng: -117.0179,
  },
  {
    id: 11,
    name: 'Protomar',
    address: 'Sancho Panza Street 3872, Col. Los Españoles CP 22104, Tijuana',
    phone: '(664) 686 2027',
    email: 'festerprotomar2023@gmail.com',
    lat: 32.5106,
    lng: -117.0335,
  },
  {
    id: 12,
    name: 'Fester Cape',
    address: 'Jose Maria Morelos y Obregon, Downtown, Cabo San Lucas, CP 23450',
    phone: '(624) 143 3868',
    email: 'c.jerez@festerbcs.com',
    lat: 22.8905,
    lng: -109.9167,
  },
  {
    id: 13,
    name: 'Peace Festival',
    address: 'Blvd. 5 de Febrero at the corner with Guillermo Prieto s/n, Nuevo Repueblo, La Paz, CP 23000',
    phone: '(612) 122 8545',
    email: 'c.jerez@festerbcs.com',
    lat: 24.1426,
    lng: -110.3108,
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
    const [nearestStores, setNearestStores] = useState([]);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    // Fetch location suggestions from OpenStreetMap Nominatim API
    const handleSearchChange = async (value) => {
      setInputValue(value); // Update input value
  
      if (value.length < 3) return; // Avoid unnecessary API calls for short input
  
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
  
    // Handle location selection from dropdown
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
          <StoreList stores={nearestStores} />
        </div>
        <div className="store-locator-right">
          <MapView userLocation={userLocation} stores={nearestStores} />
        </div>
      </div>
    );
  };
  
  export default StoreLocator;