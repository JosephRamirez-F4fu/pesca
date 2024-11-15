import React from "react";
import { Pesca } from "@/models";
import PescaCard from "./PescaCard";

interface PescaListProps {
  pescas: Pesca[];
}

const PescaList: React.FC<PescaListProps> = ({ pescas }) => {
  return (
    <div className="pesca-list">
      {pescas.map((pesca) => (
        <PescaCard key={pesca.id} pesca={pesca} />
      ))}
    </div>
  );
};

export default PescaList;
