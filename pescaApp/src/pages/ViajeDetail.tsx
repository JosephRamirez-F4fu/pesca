import { ViajeCard } from "@/components/Viaje/ViajeCard";
import { useViaje, useGasto, usePesca } from "@/context";
import { useEffect, useState } from "react";
import { ViajeFormEdit } from "@/components/Viaje/ViajeFormEdit";
import { Modal } from "@/components/shared/Modal";
import PescaResumen from "@/components/Pesca/PescaResumen";
import GastoResumen from "@/components/Gasto/GastoResumen";
import { useNavigate } from "react-router-dom";
import { PescaForm } from "@/components/Pesca/PescaForm";
import { GastosForm } from "@/components/Gasto/GastosForm";

export const ViajeDetail = () => {
  const { selectedViaje } = useViaje();
  const { gastos } = useGasto();
  const { pescas } = usePesca();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPescaFormOpen, setIsPescaFormOpen] = useState(false);
  const [isGastoFormOpen, setIsGastoFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [selectedViaje]);

  if (!selectedViaje) {
    return <div>Seleccione un viaje</div>;
  }

  const handleAddPesca = () => {
    setIsPescaFormOpen(true);
  };

  const handleAddGasto = () => {
    setIsGastoFormOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        {selectedViaje && (
          <>
            <div>
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
                onClick={() => setIsEditOpen(true)}
              >
                Editar Viaje
              </button>
            </div>
            <ViajeCard viaje={selectedViaje} />
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
              <ViajeFormEdit
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                viaje={selectedViaje}
              />
            </Modal>
          </>
        )}
      </div>
      <div className="flex justify-center mt-3">
        <div className="flex flex-wrap w-1/2">
          <div className="w-full md:w-1/2 p-2">
            <h3 className="text-2xl">Resumen de Pesca</h3>
            <PescaResumen pescas={pescas.slice(0, 3)} />
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 w-full md:w-1/2"
              onClick={() => navigate(`/pesca/${selectedViaje.id}`)}
            >
              Ver todas las pescas
            </button>
            <button
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 w-full md:w-1/2"
              onClick={handleAddPesca}
            >
              Añadir Pesca
            </button>
          </div>

          <div className="w-full md:w-1/2 p-2">
            <h3 className="text-2xl ">Resumen de Gastos</h3>
            <GastoResumen gastos={gastos.slice(0, 3)} />
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 w-full md:w-1/2"
              onClick={() => navigate(`/gastos/${selectedViaje.id}`)}
            >
              Ver todos los gastos
            </button>
            <button
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 w-full md:w-1/2"
              onClick={handleAddGasto}
            >
              Añadir Gasto
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isPescaFormOpen} onClose={() => setIsPescaFormOpen(false)}>
        <PescaForm
          isOpen={isPescaFormOpen}
          onClose={() => setIsPescaFormOpen(false)}
        />
      </Modal>
      <Modal isOpen={isGastoFormOpen} onClose={() => setIsGastoFormOpen(false)}>
        <GastosForm
          isOpen={isGastoFormOpen}
          onClose={() => setIsGastoFormOpen(false)}
        />
      </Modal>
    </div>
  );
};
