import { ViajeDTO, Viaje } from "@/models";
import { useForm } from "react-hook-form";
import { SnackBar } from "@/components/shared/SnackBar";
import { useState } from "react";
import { useViaje } from "@/context/ViajeContext";

interface ViajeFormProps {
  isOpen: boolean;
  onClose: () => void;
  viaje: Viaje;
}

export const ViajeFormEdit = ({ isOpen, onClose, viaje }: ViajeFormProps) => {
  const { updateViaje, deleteViaje, error } = useViaje();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViajeDTO>({
    defaultValues: {
      petroleo_cargado: viaje.petroleo_cargado,
      petroleo_consumido: viaje.petroleo_consumido,
      costo_petroleo_consumido: viaje.costo_petroleo_consumido,
      costo_petroleo_cargado: viaje.costo_petroleo_cargado,
      costo_viveres: viaje.costo_viveres,
      terminado: viaje.terminado,
      flota_id: viaje.flota_id,
    },
  });
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const onSubmit = async (data: ViajeDTO) => {
    await updateViaje(viaje.id, data);
    if (!error) {
      setSnackBarMessage("Viaje Editado con éxito");
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
    await deleteViaje(viaje.id);
    if (!error) {
      setSnackBarMessage("Viaje Eliminado con éxito");
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Petroleo Cargado
            </label>
            <input
              type="number"
              placeholder="Ingrese la cantidad de petroleo cargado"
              {...register("petroleo_cargado", {
                required: "Petroleo Cargado es requerido",
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.petroleo_cargado && (
              <span className="text-red-500 text-xs">
                {errors.petroleo_cargado.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Petroleo Consumido
            </label>
            <input
              type="number"
              placeholder="Ingrese la cantidad de petroleo consumido"
              {...register("petroleo_consumido", {
                required: "Petroleo Consumido es requerido",
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.petroleo_consumido && (
              <span className="text-red-500 text-xs">
                {errors.petroleo_consumido.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Costo Petroleo Consumido
            </label>
            <input
              type="number"
              placeholder="Ingrese el costo del petroleo consumido"
              {...register("costo_petroleo_consumido", {
                required: "Costo Petroleo Consumido es requerido",
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.costo_petroleo_consumido && (
              <span className="text-red-500 text-xs">
                {errors.costo_petroleo_consumido.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Costo Petroleo Cargado
            </label>
            <input
              type="number"
              placeholder="Ingrese el costo del petroleo cargado"
              {...register("costo_petroleo_cargado", {
                required: "Costo Petroleo Cargado es requerido",
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.costo_petroleo_cargado && (
              <span className="text-red-500 text-xs">
                {errors.costo_petroleo_cargado.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Costo Viveres
            </label>
            <input
              type="number"
              placeholder="Ingrese el costo de los viveres"
              {...register("costo_viveres", {
                required: "Costo Viveres es requerido",
              })}
              className="w-full p-2 rounded border border-gray-300"
            />
            {errors.costo_viveres && (
              <span className="text-red-500 text-xs">
                {errors.costo_viveres.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Terminado
            </label>
            <input
              type="checkbox"
              {...register("terminado")}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">Marque si el viaje ha terminado</span>
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
