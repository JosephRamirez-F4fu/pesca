import { createContext, useState, useEffect, useContext } from "react";
import { GastosService } from "@/services/use";
import { GastosViaje, GastosViajeDTO } from "@/models";
import { useViaje } from "./ViajeContext";

interface GastoContextProps {
  gastos: GastosViaje[];
  crearGasto: (gasto: GastosViajeDTO) => Promise<void>;
  updateGasto: (id: number, gasto: GastosViajeDTO) => Promise<void>;
  deleteGasto: (id: number) => Promise<void>;
  message: string | null;
  error: string | null;
}

export const GastoContext = createContext<GastoContextProps | null>(null);

interface GastoProviderProps {
  children: React.ReactNode;
}

export const GastoProvider: React.FC<GastoProviderProps> = ({ children }) => {
  const { selectedViaje } = useViaje();
  const [gastos, setGastos] = useState<GastosViaje[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const gastoService = new GastosService();

  useEffect(() => {
    if (selectedViaje) {
      const fetchGastos = async () => {
        const response = await gastoService.getGastosViajeByViajeId(
          selectedViaje.id
        );
        if (Array.isArray(response)) {
          setGastos(response);
          setMessage("Gastos obtenidos correctamente");
        } else {
          setError(response.message || "Error al obtener los gastos");
        }
      };
      fetchGastos();
    }
  }, [selectedViaje]);

  const crearGasto = async (gastodto: GastosViajeDTO) => {
    if (!selectedViaje) {
      setError("Debe seleccionar un viaje primero");
      return;
    }

    const gasto = { ...gastodto, id_viaje: selectedViaje.id };
    const response = await gastoService.createGastoViaje(gasto);
    if ("id" in response) {
      setGastos([...gastos, response]);
      setMessage("Gasto creado correctamente");
    } else {
      setError(response.message || "Error al crear el gasto");
    }
  };

  const updateGasto = async (id: number, updatedGasto: GastosViajeDTO) => {
    if (!selectedViaje) {
      setError("Debe seleccionar un viaje primero");
      return;
    }
    updatedGasto.id_viaje = selectedViaje.id;
    const response = await gastoService.updateGastoViaje(id, updatedGasto);
    if ("id" in response) {
      setGastos(gastos.map((gasto) => (gasto.id === id ? response : gasto)));
      setMessage("Gasto actualizado correctamente");
    } else {
      setError(response.message || "Error al actualizar el gasto");
    }
  };

  const deleteGasto = async (id: number) => {
    const response = await gastoService.deleteGastoViaje(id);
    if ("id" in response) {
      setGastos(gastos.filter((gasto) => gasto.id !== id));
      setMessage("Gasto eliminado correctamente");
    } else {
      setError(response.message || "Error al eliminar el gasto");
    }
  };

  return (
    <GastoContext.Provider
      value={{ gastos, crearGasto, updateGasto, deleteGasto, message, error }}
    >
      {children}
    </GastoContext.Provider>
  );
};

export const useGasto = () => {
  const context = useContext(GastoContext);
  if (!context) {
    throw new Error("useGasto must be used within a GastoProvider");
  }
  return context;
};
