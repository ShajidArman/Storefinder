const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080; // ✅ Use environment variable for flexible deployment

// ✅ Allow Only Your Website to Access the API
const allowedOrigins = [
  "http://localhost:3000", // ✅ For local development
  "https://www.fester.com.mx" // ✅ Your actual website
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || !origin) {  // ✅ Fix: Allow same-origin requests
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// ✅ Secure API Route to Get the Iframe URL
app.get('/get-iframe-url', (req, res) => {
  // Security: Check referer (Only allow from your site)
  const referer = req.get('referer') || "";
  
  if (!referer.startsWith("https://www.fester.com.mx")) {  // ✅ Fix: Stricter check
    return res.status(403).json({ error: "Unauthorized access" });
  }

  // ✅ Send the iframe URL securely
  const iframeURL = "https://wonderful-panda-3259de.netlify.app/";
  res.json({ iframeURL });
});

// ✅ Start Express Server
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
