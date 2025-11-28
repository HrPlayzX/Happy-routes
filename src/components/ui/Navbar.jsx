import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
console.log("NAVBAR LOADED");

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-white border-b shadow flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">Happy Routes</h1>

      <div className="space-x-4">

        <Link to="/">
          <Button variant="ghost">Map</Button>
        </Link>

        <Link to="/gallery">
          <Button variant="ghost">Gallery</Button>
        </Link>

        <Link to="/add">
          <Button>Add Pothole</Button>
        </Link>

        {/* WiFi Demo Button */}
        <Link to="/demo-wifi">
          <Button
            variant="outline"
            className="border-green-500 text-green-600"
          >
            📶 Demo WiFi
          </Button>
        </Link>
           <div className="bg-red-500">TEST</div>

      </div>
    </nav>
  );
}
