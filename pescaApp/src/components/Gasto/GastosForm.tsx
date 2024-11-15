import { GastosViajeDTO, FormProps } from "@/models";
import { useForm } from "react-hook-form";
import { SnackBar } from "@/components/shared/SnackBar";
import { useState } from "react";
import { useGasto } from "@/context/GastoContext";

export const GastosForm = ({ isOpen, onClose }: FormProps) => {
  const { crearGasto, error } = useGasto();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GastosViajeDTO>();
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);

  const onSubmit = async (data: GastosViajeDTO) => {
    await crearGasto(data);
    if (!error) {
      setSnackBarMessage("Gasto creado con éxito");
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
            Enviar
          </button>
        </form>
      )}
      {snackBarMessage && <SnackBar message={snackBarMessage} />}
    </>
  );
};
