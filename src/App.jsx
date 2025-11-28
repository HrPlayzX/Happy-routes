import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/GalleryPage";
import AddPothole from "./pages/AddPotholePage";
import DemoWiFi from "./pages/DemoWiFi";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/add" element={<AddPothole />} />
        <Route path="/demo-wifi" element={<DemoWiFi />} />
      </Routes>
    </>
  );
}
