import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AddPotholePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    lat: "",
    lng: "",
    severity: "Low",
    description: "",
    imgFile: null
  });

  // Convert image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, imgFile: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.lat || !form.lng) {
      alert("Please enter latitude and longitude");
      return;
    }

    const newPothole = {
      id: Date.now(),
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      severity: form.severity,
      description: form.description,
      img: form.imgFile || "/default.jpg"
    };

    const old = JSON.parse(localStorage.getItem("potholes") || "[]");
    old.push(newPothole);
    localStorage.setItem("potholes", JSON.stringify(old));

    alert("Pothole added successfully!");

    setForm({
      lat: "",
      lng: "",
      severity: "Low",
      description: "",
      imgFile: null
    });
  };

  return (
    <div className="p-6 flex flex-col items-center w-full">

      {/* TOP BAR */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <div className="p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-sm font-medium">
          ⚠️ Prototype for Competition Use Only
        </div>

        {/* CONNECT WIFI BUTTON */}
        <button
          onClick={() => navigate("/demo-wifi")}
          className="px-4 py-2 rounded-xl text-white font-semibold 
                     bg-gradient-to-r from-purple-600 to-blue-500 
                     shadow-md hover:shadow-xl transition-all"
        >
          Connect Wi-Fi
        </button>
      </div>

      {/* MAIN CARD */}
      <Card className="w-full max-w-xl shadow-2xl rounded-2xl border border-gray-200">
        <CardContent className="p-6">

          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Add New Pothole
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* LATITUDE */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Latitude</label>
              <input
                type="number"
                step="0.000001"
                value={form.lat}
                placeholder="28.6139"
                onChange={(e) => setForm({ ...form, lat: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>

            {/* LONGITUDE */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Longitude</label>
              <input
                type="number"
                step="0.000001"
                value={form.lng}
                placeholder="77.2090"
                onChange={(e) => setForm({ ...form, lng: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl
                           focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>

            {/* SEVERITY */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Severity</label>
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl
                           focus:ring-2 focus:ring-blue-300 outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Description</label>
              <textarea
                rows="3"
                value={form.description}
                placeholder="Describe the pothole..."
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl
                           focus:ring-2 focus:ring-blue-300 outline-none"
              ></textarea>
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                onChange={handleImageUpload}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="w-full py-3 text-lg rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              Save Pothole
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FOOTER */}
      <footer className="mt-6 text-gray-500 text-sm">
        Happy Routes © Prototype Version
      </footer>
    </div>
  );
}
