import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ViajesPage,
  FlotasPage,
  ViajeDetail,
  GastosPage,
  PescasPage,
} from "@/pages";
import { Navbar } from "@/components/shared/Navbar";
export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/flota" element={<FlotasPage />} />
        <Route path="/viaje" element={<ViajesPage />} />
        <Route path="/viaje/:id" element={<ViajeDetail />} />
        <Route path="/gastos/:id" element={<GastosPage />} />
        <Route path="/pesca/:id" element={<PescasPage />} />
      </Routes>
    </Router>
  );
};
