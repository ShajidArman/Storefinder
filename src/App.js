import React from "react";
import "./App.css";
import StoreLocator from "./components/Storelocator";
import IframeLoader from "./components/IframeLoader"; 

function App() {
  return (
    <div className="App">
      <StoreLocator />  {/* ✅ Your store locator component */}
      <IframeLoader />   {/* ✅ Securely loads the iframe */}
    </div>
  );
}

export default App;
