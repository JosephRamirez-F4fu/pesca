import { PescaDTO, Pesca } from "@/models";
import { useForm } from "react-hook-form";
import { SnackBar } from "@/components/shared/SnackBar";
import { useState } from "react";
import { usePesca } from "@/context/PescaContext";

interface PescaFormProps {
  isOpen: boolean;
  onClose: () => void;
  pesca: Pesca;
}

export const PescaFormEdit = ({ isOpen, onClose, pesca }: PescaFormProps) => {
  const { updatePesca, deletePesca, error } = usePesca();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PescaDTO>({
    defaultValues: {
      pescado_tipo: pesca.pescado_tipo,
      pescado_cajas: pesca.pescado_cajas,
      precio: pesca.precio,
      id_viaje: pesca.id_viaje,
    },
  });
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const onSubmit = async (data: PescaDTO) => {
    await updatePesca(pesca.id, data);
    if (!error) {
      setSnackBarMessage("Pesca Editada con éxito");
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
    await deletePesca(pesca.id);
    if (!error) {
      setSnackBarMessage("Pesca Eliminada con éxito");
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
              placeholder="Tipo de Pescado"
              {...register("pescado_tipo", {
                required: "Tipo de Pescado es requerido",
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.pescado_tipo && (
              <span className="text-red-500 text-xs">
                {errors.pescado_tipo.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Cajas de Pescado"
              {...register("pescado_cajas", {
                required: "Cajas de Pescado es requerido",
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.pescado_cajas && (
              <span className="text-red-500 text-xs">
                {errors.pescado_cajas.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Precio"
              {...register("precio", { required: "Precio es requerido" })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.precio && (
              <span className="text-red-500 text-xs">
                {errors.precio.message}
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
