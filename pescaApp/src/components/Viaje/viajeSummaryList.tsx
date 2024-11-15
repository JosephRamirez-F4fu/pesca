import { ViajeSummaryCard } from "@/components";
import { useViaje } from "@/context";
import { useNavigate } from "react-router-dom";

export const ViajeSummaryList = () => {
  const { viajesSummary, cargarViajeId } = useViaje();
  const navigate = useNavigate();

  const handleSelectViaje = (viajeId: number) => {
    cargarViajeId(viajeId);
    navigate(`/viaje/${viajeId}`);
  };
  return (
    <div className="flex">
      {viajesSummary.map((viaje) => (
        <div
          onClick={() => handleSelectViaje(viaje.id)}
          key={viaje.id}
          style={{
            cursor: "pointer",
          }}
        >
          <ViajeSummaryCard key={viaje.id} viaje={viaje} />
        </div>
      ))}
    </div>
  );
};
