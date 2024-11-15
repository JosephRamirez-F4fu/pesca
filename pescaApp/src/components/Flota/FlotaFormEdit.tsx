import { FlotaDTO, Flota } from "@/models";
import { useForm } from "react-hook-form";
import { SnackBar } from "@/components/shared/SnackBar";
import { useState } from "react";
import { useFlota } from "@/context/FlotaContext";

interface FlotaFormProps {
  isOpen: boolean;
  onClose: () => void;
  flota: Flota;
}

export const FlotaFormEdit = ({ isOpen, onClose, flota }: FlotaFormProps) => {
  const { updateFlota, deleteFlota, error } = useFlota();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlotaDTO>({
    defaultValues: {
      nombre: flota.nombre,
      titular: flota.titular,
      capacidad: flota.capacidad,
    },
  });
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const onSubmit = async (data: FlotaDTO) => {
    await updateFlota(flota.id, data);
    if (!error) {
      setSnackBarMessage("Flota Editada con éxito");
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
    await deleteFlota(flota.id);
    if (!error) {
      setSnackBarMessage("Flota Eliminada con éxito");
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
              placeholder="Nombre"
              {...register("nombre", { required: "Nombre is required" })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.nombre && (
              <span className="text-red-500 text-xs">
                {errors.nombre.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Titular"
              {...register("titular", { required: "Titular is required" })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.titular && (
              <span className="text-red-500 text-xs">
                {errors.titular.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Capacidad"
              {...register("capacidad", {
                required: "Capacidad is required",
                min: { value: 1, message: "Capacidad must be greater than 0" },
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.capacidad && (
              <span className="text-red-500 text-xs">
                {errors.capacidad.message}
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
