import React, { useEffect, useState } from "react";

const IframeLoader = () => {
  const [iframeURL, setIframeURL] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchIframeURL = async () => {
      try {
        const response = await fetch("https://your-backend-url.com/get-iframe-url"); // ✅ Replace with your backend URL
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
  }, []);

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
