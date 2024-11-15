import { ViajeSummary } from "@/models";

export const ViajeSummaryCard = ({ viaje }: { viaje: ViajeSummary }) => {
  return (
    <div className="bg-blue-200 shadow-md rounded-lg p-5 inline-block m-4">
      <div className="card-body">
        <h5 className="text-xl font-bold text-gray-800 mb-4">
          Resumen del Viaje
        </h5>
        {[
          { label: "Costo Total", value: viaje.total_costo },
          { label: "Gastos Totales", value: viaje.total_gastos },
          { label: "Bruto Total", value: viaje.total_bruto },
          { label: "Ganancia Total", value: viaje.total_ganancia },
          { label: "Ganancia Neta", value: viaje.total_ganancia_neta },
        ].map((item, index) => (
          <div className="mb-2" key={index}>
            <span className="font-semibold text-gray-700">{item.label}: </span>
            <span className="text-gray-600">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
