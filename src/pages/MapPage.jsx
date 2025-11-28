import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Default sample potholes
const defaultPotholes = [
  {
    id: 1,
    lat: 28.6139,
    lng: 77.2090,
    severity: "High",
    description: "Large pothhole near road divider",
    img: "/pothole1.jpg",
  },
  {
    id: 2,
    lat: 28.6200,
    lng: 77.2150,
    severity: "Medium",
    description: "Medium pothole causing traffic slowdown",
    img: "/pothole2.jpg",
  },
];

export default function Map() {
  const [potholes, setPotholes] = useState([]);
  const [selected, setSelected] = useState(null);

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState(null);
  const [severity, setSeverity] = useState("Low");
  const [desc, setDesc] = useState("");

  // Load potholes from LocalStorage or use defaults
  useEffect(() => {
    const saved = localStorage.getItem("potholes");
    if (saved) {
      setPotholes(JSON.parse(saved));
    } else {
      setPotholes(defaultPotholes);
    }
  }, []);

  // Save back to LocalStorage whenever potholes update
  useEffect(() => {
    localStorage.setItem("potholes", JSON.stringify(potholes));
  }, [potholes]);

  // Convert image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addPothole = () => {
    if (!lat || !lng) {
      alert("Please provide latitude & longitude.");
      return;
    }

    const newPothole = {
      id: potholes.length + 1,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      severity,
      description: desc || "User-added pothole",
      img: image || "/placeholder.jpg",
    };

    setPotholes([...potholes, newPothole]);

    // Reset fields
    setLat("");
    setLng("");
    setSeverity("Low");
    setDesc("");
    setImage(null);

    alert("Pothole added & saved in LocalStorage!");
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-3">
      
      {/* MAP */}
      <div className="col-span-2 h-screen">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

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

      {/* RIGHT SIDEBAR */}
      <div className="col-span-1 p-5 overflow-y-auto bg-gray-50 border-l">

        <h1 className="text-3xl font-bold mb-5">Pothole Details</h1>

        {/* ADD NEW MARKER FORM */}
        <Card className="border p-4 mb-5 shadow rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-3">Add New Pothole</h2>

            {/* Latitude */}
            <input
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />

            {/* Longitude */}
            <input
              type="number"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />

            {/* Severity Dropdown */}
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            {/* Description */}
            <textarea
              placeholder="Description (optional)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mb-3 p-2 border rounded"
            />

            {/* Preview */}
            {image && (
              <img
                src={image}
                alt="preview"
                className="w-full h-40 object-cover rounded-xl border mb-3"
              />
            )}

            <button
              onClick={addPothole}
              className="w-full rounded-lg bg-green-600 text-white py-2 hover:bg-green-700 transition"
            >
              Add Pothole
            </button>
          </CardContent>
        </Card>

        {/* SELECTED POTHOLE INFO */}
        {!selected && (
          <p className="text-gray-600">Click a marker on the map to view details.</p>
        )}

        {selected && (
          <Card className="border shadow-lg rounded-2xl p-3 bg-white">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-2">
                Severity:{" "}
                <span
                  className={`${
                    selected.severity === "High"
                      ? "text-red-600"
                      : selected.severity === "Medium"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  {selected.severity}
                </span>
              </h2>

              <p className="mb-3 text-gray-700">{selected.description}</p>

              <img
                src={selected.img}
                alt="Pothole"
                className="rounded-xl mb-4 border"
              />

              <button
                className="w-full mt-2 rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition"
              >
                Report / Fix Request
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
