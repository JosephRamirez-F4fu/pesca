import React from "react";
import { GastosViaje } from "@/models";

interface GastoResumenProps {
  gastos: GastosViaje[];
}

const GastoResumen: React.FC<GastoResumenProps> = ({ gastos }) => {
  const total = gastos.reduce((sum, gasto) => sum + gasto.importe, 0);

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md ">
      <h3 className="text-xl font-bold mb-2">Resumen de Gastos</h3>
      <p className="text-lg">Total: {total}</p>
    </div>
  );
};

export default GastoResumen;
