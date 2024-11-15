import { Viaje } from "@/models";

interface ViajeCardProps {
  viaje: Viaje;
}

export const ViajeCard: React.FC<ViajeCardProps> = ({ viaje }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-1/3">
      <div className="p-6">
        <h5 className="text-2xl font-bold text-gray-900 mb-4">
          Viaje {viaje.id}
        </h5>
        <p className="text-gray-700 mb-2">
          Petroleo Cargado: {viaje.petroleo_cargado}
        </p>
        <p className="text-gray-700 mb-2">
          Petroleo Consumido: {viaje.petroleo_consumido}
        </p>
        <p className="text-gray-700 mb-2">
          Costo Petroleo Consumido: {viaje.costo_petroleo_consumido}
        </p>
        <p className="text-gray-700 mb-2">
          Costo Petroleo Cargado: {viaje.costo_petroleo_cargado}
        </p>
        <p className="text-gray-700 mb-2">
          Costo Viveres: {viaje.costo_viveres}
        </p>
        <p className="text-gray-700 mb-2">
          Terminado: {viaje.terminado ? "Sí" : "No"}
        </p>
        <p className="text-gray-700 mb-2">Flota ID: {viaje.flota_id}</p>
      </div>
    </div>
  );
};
