import { Flota } from "@/models";

export const FlotaCard = ({ flota }: { flota: Flota }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow block w-40  ">
      <h3 className="text-xl font-semibold mb-2">{flota.nombre}</h3>
      <p className="text-gray-700">
        <strong>Titular:</strong> {flota.titular}
      </p>
      <p className="text-gray-700">
        <strong>Capacidad:</strong> {flota.capacidad}
      </p>
    </div>
  );
};
