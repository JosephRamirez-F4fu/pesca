// FlotaContext.tsx
import { createContext, useState, useEffect, useContext } from "react";
import { FlotaService } from "@/services/use";
import { Flota, FlotaDTO } from "@/models";

interface FlotaContextProps {
  flotas: Flota[];
  crearFlota: (flota: FlotaDTO) => Promise<void>;
  updateFlota: (id: number, flota: FlotaDTO) => Promise<void>;
  deleteFlota: (id: number) => Promise<void>;
  message: string | null;
  error: string | null;
}

export const FlotaContext = createContext<FlotaContextProps | null>(null);

interface FlotaProviderProps {
  children: React.ReactNode;
}

export const FlotaProvider: React.FC<FlotaProviderProps> = ({ children }) => {
  const [flotas, setFlotas] = useState<Flota[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const flotaService = new FlotaService();

  useEffect(() => {
    const fetchFlotas = async () => {
      const response = await flotaService.getFlotas();
      if (Array.isArray(response)) {
        setFlotas(response);
        setMessage("Flotas obtenidas correctamente");
      } else {
        setError(response.message || "Error al obtener las flotas");
      }
    };
    fetchFlotas();
  }, []);

  const crearFlota = async (flota: FlotaDTO) => {
    const response = await flotaService.createFlota(flota);
    if ("id" in response) {
      setFlotas([...flotas, response]);
      setMessage("Flota creada correctamente");
    } else {
      setError(response.message || "Error al crear la flota");
    }
  };

  const updateFlota = async (id: number, updatedFlota: FlotaDTO) => {
    const response = await flotaService.updateFlota(id, updatedFlota);
    if ("id" in response) {
      setFlotas(flotas.map((flota) => (flota.id === id ? response : flota)));
      setMessage("Flota actualizada correctamente");
    } else {
      setError(response.message || "Error al actualizar la flota");
    }
  };

  const deleteFlota = async (id: number) => {
    const response = await flotaService.deleteFlota(id);
    if ("id" in response) {
      setFlotas(flotas.filter((flota) => flota.id !== id));
      setMessage("Flota eliminada correctamente");
    } else {
      setError(response.message || "Error al eliminar la flota");
    }
  };

  return (
    <FlotaContext.Provider
      value={{ flotas, crearFlota, updateFlota, deleteFlota, message, error }}
    >
      {children}
    </FlotaContext.Provider>
  );
};

export const useFlota = () => {
  const context = useContext(FlotaContext);
  if (!context) {
    throw new Error("useFlota must be used within a FlotaProvider");
  }
  return context;
};
