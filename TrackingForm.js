import { useState } from "react";
import { Input, Button, Card, Spin, Alert } from "antd";
import axios from "axios";

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
      const response = await axios.get(`https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=XW827106090JB}/`);
      setTrackingData(response.data);
    } catch (err) {
      setError("Invalid tracking number or server error.");
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

      {loading && <Spin style={{ margin: 20 }} />}
      {error && <Alert message={error} type="error" showIcon style={{ marginTop: 10 }} />}
      {trackingData && (
        <Card style={{ marginTop: 20 }}>
          <h3>Tracking Details</h3>
          <pre>{JSON.stringify(trackingData, null, 2)}</pre>
        </Card>
      )}
    </Card>
  );
};

export default TrackingForm;
