import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Demo data (replace with DB)
const potholes = [
  {
    id: 1,
    lat: 28.6139,
    lng: 77.209,
    severity: "High",
    description: "Large pothole near road divider",
    img: "/pothole1.jpg",
  },
  {
    id: 2,
    lat: 28.62,
    lng: 77.215,
    severity: "Medium",
    description: "Medium pothhole causing traffic slowdown",
    img: "/pothole2.jpg",
  },
];

export default function PotholeMap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-3 bg-gray-100">

      {/* MAP SECTION — Smaller + Rounded + Shadow */}
      <div className="col-span-2 py-6 px-6">
        <div className="w-full h-[75vh] rounded-2xl overflow-hidden shadow-xl border">
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {potholes.map((p) => (
              <Marker
                key={p.id}
                position={[p.lat, p.lng]}
                eventHandlers={{
                  click: () => setSelected(p),
                }}
              />
            ))}
          </MapContainer>
        </div>
      </div>

      {/* SIDE PANEL */}
      <div className="col-span-1 p-6 bg-white shadow-xl border-l rounded-l-2xl space-y-6">

        {/* Prototype Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Happy Routes</h1>
          <p className="text-gray-600 text-sm">
            This is a prototype demo. ESP32 communication is disabled.
          </p>
        </div>

        {/* Fake Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="border-blue-600 text-blue-600 w-full">
            🔵 Demo Bluetooth
          </Button>

          <Button variant="outline" className="border-green-600 text-green-600 w-full">
            📶 Demo WiFi
          </Button>
        </div>

        <hr />

        <h2 className="text-xl font-semibold">Pothole Details</h2>

        {!selected && (
          <p className="text-gray-500">Select a marker on the map to view information.</p>
        )}

        {selected && (
          <Card className="shadow-lg rounded-2xl p-3 bg-gray-50">
            <CardContent className="space-y-3">

              {/* SEVERITY BADGE */}
              <div
                className={`px-3 py-1 rounded-full text-white w-fit text-sm ${
                  selected.severity === "High"
                    ? "bg-red-600"
                    : selected.severity === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-600"
                }`}
              >
                Severity: {selected.severity}
              </div>

              <p className="text-gray-700">{selected.description}</p>

              <img
                src={selected.img}
                alt="Pothole"
                className="rounded-xl shadow-lg border"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
