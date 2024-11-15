import { usePesca } from "@/context";
import { Modal } from "@/components/shared";
import { PescaForm, PescaFormEdit } from "@/components/Pesca";
import { useState } from "react";
import { Pesca } from "@/models";

export const PescasPage = () => {
  const { pescas } = usePesca();
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [pesca, setPesca] = useState<Pesca | null>(null);

  const handleSelectPesca = (pescaSelected: Pesca) => {
    setPesca(pescaSelected);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setPesca(null);
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
        Agregar Pesca
      </button>
      <Modal isOpen={isNewOpen} onClose={handleCloseNew}>
        <PescaForm isOpen={isNewOpen} onClose={handleCloseNew} />
      </Modal>
      {pesca && (
        <Modal isOpen={isEditOpen} onClose={handleCloseEdit}>
          <PescaFormEdit
            pesca={pesca}
            isOpen={isEditOpen}
            onClose={handleCloseEdit}
          />
        </Modal>
      )}
      <table className="min-w-full mt-4 bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Especie</th>
            <th className="px-4 py-2">Cajas</th>
            <th className="px-4 py-2">Peso</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Ganancia</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pescas.map((pesca) => (
            <tr key={pesca.id} className="border-t">
              <td className="px-4 py-2">{pesca.pescado_tipo}</td>
              <td className="px-4 py-2">{pesca.pescado_cajas}</td>
              <td className="px-4 py-2">{pesca.pescado_cajas * 24}</td>
              <td className="px-4 py-2">{pesca.precio}</td>
              <td className="px-4 py-2">
                {pesca.precio * pesca.pescado_cajas * 24}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={() => handleSelectPesca(pesca)}
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
