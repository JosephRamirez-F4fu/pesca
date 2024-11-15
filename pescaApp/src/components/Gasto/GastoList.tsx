import React from "react";
import { GastosViaje } from "@/models";
import GastoCard from "./GastoCard";

interface GastoListProps {
  gastos: GastosViaje[];
}

const GastoList: React.FC<GastoListProps> = ({ gastos }) => {
  return (
    <div>
      {gastos.map((gasto) => (
        <GastoCard key={gasto.id} gasto={gasto} />
      ))}
    </div>
  );
};

export default GastoList;
