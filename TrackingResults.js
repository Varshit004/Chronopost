import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultsPage = () => {
const { trackingNumber } = useParams();
const [trackingData, setTrackingData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
const fetchTrackingData = async () => {
try {
const response = await fetch(`https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=XW827106090JB}`
);

if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();
setTrackingData(data);
} catch (err) {
setError("Failed to fetch tracking data. Please try again.");
console.error("Error fetching tracking data:", err);
}
};

fetchTrackingData();
}, [trackingNumber]);

return (
<div>
<h1>Tracking Results for {trackingNumber}</h1>
{error && <p style={{ color: "red" }}>{error}</p>}
{trackingData ? (
<pre>{JSON.stringify(trackingData, null, 2)}</pre>
) : !error ? (
<p>Loading...</p>
) : null}
</div>
);
};

export default ResultsPage;

main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
<App />
</BrowserRouter>
);

