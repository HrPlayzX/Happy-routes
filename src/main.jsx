import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import MapPage from "./pages/MapPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import AddPotholePage from "./pages/AddPotholePage.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/add" element={<AddPotholePage />} />
    </Routes>
  </BrowserRouter>
);
