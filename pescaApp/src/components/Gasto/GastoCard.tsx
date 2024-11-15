import React from "react";
import { GastosViaje } from "@/models";

interface GastoCardProps {
  gasto: GastosViaje;
}

const GastoCard: React.FC<GastoCardProps> = ({ gasto }) => {
  return (
    <div>
      <h3>{gasto.concepto}</h3>
      <p>Importe: {gasto.importe}</p>
    </div>
  );
};

export default GastoCard;
