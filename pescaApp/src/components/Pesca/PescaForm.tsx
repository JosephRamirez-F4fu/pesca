import { PescaDTO, FormProps } from "@/models";
import { useForm } from "react-hook-form";
import { SnackBar } from "@/components/shared/SnackBar";
import { useState } from "react";
import { usePesca } from "@/context/PescaContext";

export const PescaForm = ({ isOpen, onClose }: FormProps) => {
  const { crearPesca, error } = usePesca();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PescaDTO>();
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const onSubmit = async (data: PescaDTO) => {
    await crearPesca(data);
    if (!error) {
      setSnackBarMessage("Pesca creada con éxito");
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
            Enviar
          </button>
        </form>
      )}
      {snackBarMessage && <SnackBar message={snackBarMessage} />}
    </>
  );
};
