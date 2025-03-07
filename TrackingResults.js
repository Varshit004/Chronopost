import { useState } from "react";
import { Input, Button, Card } from "antd";
import axios from "axios";
import TrackingResults from "./TrackingResults";

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number.");
      return;
    }

    setLoading(true);
    setError("");
    setTrackingData(null);

    try {
      setTrackingData(response.data);
    } catch (err) {
      setError("Invalid tracking number or server error.");
      console.error("Error fetching tracking data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Chronopost Tracking" style={{ width: 400, margin: "50px auto", textAlign: "center" }}>
      <Input
        placeholder="Enter Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleTrack} block>
        Track
      </Button>

      {/* Use TrackingResults component */}
      <TrackingResults trackingData={trackingData} loading={loading} error={error} />
    </Card>
  );
};

export default TrackingForm;
