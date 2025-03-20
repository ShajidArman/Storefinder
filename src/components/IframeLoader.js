import React, { useEffect, useState } from "react";

const IframeLoader = () => {
  const [iframeURL, setIframeURL] = useState("");
  const [error, setError] = useState(false);

  // ✅ Use the deployed backend URL
  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8080" // ✅ Local development
      : "https://storefinder.onrender.com"; // ✅ Your live backend on Render

  useEffect(() => {
    const fetchIframeURL = async () => {
      try {
        const response = await fetch(`${backendURL}/get-iframe-url`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch iframe URL");
        }

        const data = await response.json();

        if (data.iframeURL) {
          setIframeURL(data.iframeURL); // ✅ Set the received URL
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("🚨 Error fetching iframe URL:", error);
        setError(true);
      }
    };

    fetchIframeURL();
  }, [backendURL]);

  return (
    <div>
      <h2>Secure Iframe</h2>
      {error ? (
        <p style={{ color: "red" }}>⚠️ Error loading iframe. Check console.</p>
      ) : iframeURL ? (
        <iframe
          src={iframeURL}
          width="100%"
          height="600"
          style={{ border: "none" }}
          title="Secure Store Locator"
        ></iframe>
      ) : (
        <p>Loading iframe...</p>
      )}
    </div>
  );
};

export default IframeLoader;
