import { Card } from "@/components/ui/card";

export default function GalleryPage() {
  const saved = JSON.parse(localStorage.getItem("potholes") || "[]");

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <h1 className="col-span-full text-3xl font-bold mb-4">Pothole Gallery</h1>

      {saved.length === 0 && (
        <p className="text-gray-600">No potholes added yet.</p>
      )}

      {saved.map((p) => (
        <Card key={p.id} className="shadow-md p-3 bg-white rounded-xl">
          <img
            src={p.img}
            className="rounded-lg mb-3 h-40 w-full object-cover"
          />

          <h2 className="text-lg font-semibold">Severity: {p.severity}</h2>
          <p className="text-sm text-gray-700">{p.description}</p>

          <p className="mt-2 text-xs text-gray-500">
            Lat: {p.lat}, Lng: {p.lng}
          </p>
        </Card>
      ))}
    </div>
  );
}
