import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoWiFi() {
  const [connected, setConnected] = useState(false);
  const [demoData, setDemoData] = useState(null);

  const generateFakeData = () => {
    // Fake ESP32 data generation
    const data = {
      lat: 28.60 + Math.random() * 0.05,
      lng: 77.20 + Math.random() * 0.05,
      severity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
      description: "Auto-detected pothole from ESP32 vibration sensor",
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage like ESP32 sent it
    const stored = JSON.parse(localStorage.getItem("potholes") || "[]");
    stored.push({
      id: Date.now(),
      lat: data.lat,
      lng: data.lng,
      severity: data.severity,
      description: data.description,
      img: "/esp32.jpg"
    });

    localStorage.setItem("potholes", JSON.stringify(stored));

    setDemoData(data);
  };

  const handleConnect = () => {
    setConnected(true);
    setTimeout(generateFakeData, 1500); // simulate delay
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">Wi-Fi Demo — ESP32 Prototype</h1>

      <p className="text-gray-600 mb-4">
        This feature is a prototype for the competition.  
        It demonstrates how ESP32 can automatically send pothole data.
      </p>

      {!connected && (
        <Button 
          onClick={handleConnect} 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
        >
          Connect Wi-Fi
        </Button>
      )}

      {connected && !demoData && <p className="mt-4 text-gray-600">Connecting to ESP32...</p>}

      {demoData && (
        <Card className="mt-5 shadow-xl border rounded-xl">
          <CardContent>

            <h2 className="text-xl font-bold text-green-700 mb-3">
              ESP32 Connected — Data Received
            </h2>

            <p><strong>Latitude:</strong> {demoData.lat.toFixed(6)}</p>
            <p><strong>Longitude:</strong> {demoData.lng.toFixed(6)}</p>
            <p><strong>Severity:</strong> {demoData.severity}</p>
            <p><strong>Description:</strong> {demoData.description}</p>
            <p><strong>Time:</strong> {demoData.timestamp}</p>

            <p className="mt-4 text-sm text-blue-600">
              ✔ Data added to Excel sheet (simulation)  
              ✔ Data saved to system  
              ✔ Marker will appear on Map page
            </p>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
