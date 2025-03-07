import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      const response = await axios.get(`https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=XW827106090JB/`);
      setTrackingData(response.data);
    } catch (err) {
      setError("Invalid tracking number or server error.");
      setTrackingData(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chronopost Tracking</h1>
        <input
          type="text"
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button onClick={handleTrack}>Track</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {trackingData && (
          <div>
            <h3>Tracking Details</h3>
            <pre>{JSON.stringify(trackingData, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
