import { GastosViajeDTO, GastosViaje } from "@/models";
import { useForm } from "react-hook-form";
import { SnackBar } from "@/components/shared/SnackBar";
import { useState } from "react";
import { useGasto } from "@/context/GastoContext";

interface GastoFormProps {
  isOpen: boolean;
  onClose: () => void;
  gasto: GastosViaje;
}

export const GastoFormEdit = ({ isOpen, onClose, gasto }: GastoFormProps) => {
  const { updateGasto, deleteGasto, error } = useGasto();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GastosViajeDTO>({
    defaultValues: {
      concepto: gasto.concepto,
      importe: gasto.importe,
      id_viaje: gasto.id_viaje,
    },
  });
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const onSubmit = async (data: GastosViajeDTO) => {
    await updateGasto(gasto.id, data);
    if (!error) {
      setSnackBarMessage("Gasto Editado con éxito");
      setTimeout(() => {
        setSnackBarMessage(null);
        onClose();
      }, 200);
    } else {
      setSnackBarMessage(error);
      setTimeout(() => setSnackBarMessage(null), 3000);
    }
  };

  const onDelete = async () => {
    await deleteGasto(gasto.id);
    if (!error) {
      setSnackBarMessage("Gasto Eliminado con éxito");
      setTimeout(() => {
        setSnackBarMessage(null);
        onClose();
      }, 200);
    } else {
      setSnackBarMessage(error);
      setTimeout(() => setSnackBarMessage(null), 3000);
    }
  };

  return (
    <>
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Concepto"
              {...register("concepto", { required: "Concepto es requerido" })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.concepto && (
              <span className="text-red-500 text-xs">
                {errors.concepto.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Importe"
              {...register("importe", { required: "Importe es requerido" })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.importe && (
              <span className="text-red-500 text-xs">
                {errors.importe.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
            onClick={onDelete}
          >
            Eliminar
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-700"
            onClick={onClose}
          >
            Cancelar
          </button>
        </form>
      )}
      {snackBarMessage && <SnackBar message={snackBarMessage} />}
    </>
  );
};
