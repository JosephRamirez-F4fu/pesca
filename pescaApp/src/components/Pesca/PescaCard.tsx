import React from "react";
import { Pesca } from "@/models";

interface PescaCardProps {
  pesca: Pesca;
}

const PescaCard: React.FC<PescaCardProps> = ({ pesca }) => {
  const ganancia = pesca.pescado_cajas * pesca.precio;

  return (
    <div className="pesca-card">
      <h3>Tipo de Pescado: {pesca.pescado_tipo}</h3>
      <p>Cajas: {pesca.pescado_cajas}</p>
      <p>Precio: {pesca.precio}</p>
      <p>Ganancia: {ganancia}</p>
    </div>
  );
};

export default PescaCard;
