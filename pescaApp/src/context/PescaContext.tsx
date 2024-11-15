import { createContext, useState, useEffect, useContext } from "react";
import { PescaService } from "@/services/use";
import { Pesca, PescaDTO } from "@/models";
import { useViaje } from "./ViajeContext";

interface PescaContextProps {
  pescas: Pesca[];
  crearPesca: (pesca: PescaDTO) => Promise<void>;
  updatePesca: (id: number, pesca: PescaDTO) => Promise<void>;
  deletePesca: (id: number) => Promise<void>;
  message: string | null;
  error: string | null;
}

export const PescaContext = createContext<PescaContextProps | null>(null);

interface PescaProviderProps {
  children: React.ReactNode;
}

export const PescaProvider: React.FC<PescaProviderProps> = ({ children }) => {
  const { selectedViaje } = useViaje();
  const [pescas, setPescas] = useState<Pesca[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pescaService = new PescaService();

  useEffect(() => {
    if (selectedViaje) {
      const fetchPescas = async () => {
        const response = await pescaService.getPescasByViajeId(
          selectedViaje.id
        );
        if (Array.isArray(response)) {
          setPescas(response);
          setMessage("Pescas obtenidas correctamente");
        } else {
          setError(response.message || "Error al obtener las pescas");
        }
      };
      fetchPescas();
    }
  }, [selectedViaje]);

  const crearPesca = async (pescadto: PescaDTO) => {
    if (!selectedViaje) {
      setError("Debe seleccionar un viaje primero");
      return;
    }
    const pesca = { ...pescadto, id_viaje: selectedViaje.id };
    console.log(pesca);
    const response = await pescaService.createPesca(pesca);
    if ("id" in response) {
      setPescas([...pescas, response]);
      setMessage("Pesca creada correctamente");
    } else {
      setError(response.message || "Error al crear la pesca");
    }
  };

  const updatePesca = async (id: number, updatedPesca: PescaDTO) => {
    if (!selectedViaje) {
      setError("Debe seleccionar un viaje primero");
      return;
    }
    updatedPesca.id_viaje = selectedViaje.id;
    const response = await pescaService.updatePesca(id, updatedPesca);
    if ("id" in response) {
      setPescas(pescas.map((pesca) => (pesca.id === id ? response : pesca)));
      setMessage("Pesca actualizada correctamente");
    } else {
      setError(response.message || "Error al actualizar la pesca");
    }
  };

  const deletePesca = async (id: number) => {
    const response = await pescaService.deletePesca(id);
    if ("id" in response) {
      setPescas(pescas.filter((pesca) => pesca.id !== id));
      setMessage("Pesca eliminada correctamente");
    } else {
      setError(response.message || "Error al eliminar la pesca");
    }
  };

  return (
    <PescaContext.Provider
      value={{ pescas, crearPesca, updatePesca, deletePesca, message, error }}
    >
      {children}
    </PescaContext.Provider>
  );
};

export const usePesca = () => {
  const context = useContext(PescaContext);
  if (!context) {
    throw new Error("usePesca must be used within a PescaProvider");
  }
  return context;
};
