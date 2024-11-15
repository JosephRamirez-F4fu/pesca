import { useGasto } from "@/context";
import { Modal } from "@/components/shared";
import { GastosForm, GastoFormEdit } from "@/components/Gasto";
import { useState } from "react";
import { GastosViaje } from "@/models";

export const GastosPage = () => {
  const { gastos } = useGasto();
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [gasto, setGasto] = useState<GastosViaje | null>(null);

  const handleSelectGasto = (gastoSelected: GastosViaje) => {
    setGasto(gastoSelected);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setGasto(null);
    setIsEditOpen(false);
  };

  const handleCloseNew = () => {
    setIsNewOpen(false);
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsNewOpen(true)}
      >
        Agregar Gasto
      </button>
      <Modal isOpen={isNewOpen} onClose={handleCloseNew}>
        <GastosForm isOpen={isNewOpen} onClose={handleCloseNew} />
      </Modal>
      {gasto && (
        <Modal isOpen={isEditOpen} onClose={handleCloseEdit}>
          <GastoFormEdit
            gasto={gasto}
            isOpen={isEditOpen}
            onClose={handleCloseEdit}
          />
        </Modal>
      )}
      <table className="min-w-full mt-4 bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Concepto</th>
            <th className="px-4 py-2">Monto</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.id} className="border-t">
              <td className="px-4 py-2">{gasto.concepto}</td>
              <td className="px-4 py-2">{gasto.importe}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={() => handleSelectGasto(gasto)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
