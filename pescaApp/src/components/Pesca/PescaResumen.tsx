import React from "react";
import { Pesca } from "@/models";

interface PescaResumenProps {
  pescas: Pesca[];
}

const PescaResumen: React.FC<PescaResumenProps> = ({ pescas }) => {
  const totalGanancia = pescas.reduce(
    (acc, pesca) => acc + pesca.pescado_cajas * pesca.precio * 24,
    0
  );

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Resumen de Ganancias</h2>
      <p className="text-lg">Total Ganancia: {totalGanancia}</p>
    </div>
  );
};

export default PescaResumen;
