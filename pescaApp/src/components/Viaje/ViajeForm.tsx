import { ViajeDTO, FormProps } from "@/models";
import { useViaje, useFlota } from "@/context";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SnackBar } from "@/components/shared/SnackBar";

export const ViajeForm = ({ isOpen, onClose }: FormProps) => {
  const { crearViaje, resetMessage, error } = useViaje();
  const { flotas } = useFlota();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViajeDTO>();
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const onSubmit = async (data: ViajeDTO) => {
    data = { ...data, terminado: false };
    await crearViaje(data);
    if (!error) {
      setSnackBarMessage("Viaje creado con éxito");
      setTimeout(() => {
        setSnackBarMessage(null);
        onClose();
        resetMessage();
      }, 3000);
    } else {
      setSnackBarMessage(error);
      setTimeout(() => {
        setSnackBarMessage(null);
        resetMessage();
      }, 3000);
    }
  };

  return (
    <>
      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 bg-white rounded shadow-md"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Flota
            </label>
            <select
              {...register("flota_id", {
                required: "Este campo es obligatorio",
              })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {flotas.map((flota) => (
                <option key={flota.id} value={flota.id}>
                  {flota.nombre} - {flota.titular}
                </option>
              ))}
            </select>
            {errors.flota_id && (
              <span className="text-red-500 text-sm">
                {errors.flota_id.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Petróleo Cargado
              </label>
              <input
                type="number"
                {...register("petroleo_cargado")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.petroleo_cargado && (
                <span className="text-red-500 text-sm">
                  {errors.petroleo_cargado.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Petróleo Consumido
              </label>
              <input
                type="number"
                {...register("petroleo_consumido")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.petroleo_consumido && (
                <span className="text-red-500 text-sm">
                  {errors.petroleo_consumido.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Costo Petróleo Consumido
              </label>
              <input
                type="number"
                {...register("costo_petroleo_consumido")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.costo_petroleo_consumido && (
                <span className="text-red-500 text-sm">
                  {errors.costo_petroleo_consumido.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Costo Petróleo Cargado
              </label>
              <input
                type="number"
                {...register("costo_petroleo_cargado")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.costo_petroleo_cargado && (
                <span className="text-red-500 text-sm">
                  {errors.costo_petroleo_cargado.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Costo Viveres
            </label>
            <input
              type="number"
              {...register("costo_viveres")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.costo_viveres && (
              <span className="text-red-500 text-sm">
                {errors.costo_viveres.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Viaje
          </button>
        </form>
      )}
      {snackBarMessage && <SnackBar message={snackBarMessage} />}
    </>
  );
};
