import { createContext, useState, useEffect, useContext } from "react";
import { ViajeService } from "@/services/use";
import { Viaje, ViajeDTO, ViajeSummary } from "@/models";

interface ViajeContextProps {
  viajes: Viaje[];
  crearViaje: (viaje: ViajeDTO) => Promise<void>;
  updateViaje: (id: number, viaje: ViajeDTO) => Promise<void>;
  deleteViaje: (id: number) => Promise<void>;
  selectedViaje: Viaje | null;
  selectViaje: (viaje: Viaje) => void;
  viajesSummary: ViajeSummary[];
  message: string | null;
  error: string | null;
  cargarViajeId: (id: number) => void;
  resetMessage: () => void;
}

export const ViajeContext = createContext<ViajeContextProps | null>(null);

interface ViajeProviderProps {
  children: React.ReactNode;
}

export const ViajeProvider: React.FC<ViajeProviderProps> = ({ children }) => {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [viajesSummary, setViajesSummary] = useState<ViajeSummary[]>([]);
  const [selectedViaje, setSelectedViaje] = useState<Viaje | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const viajeService = new ViajeService();

  useEffect(() => {
    const fetchViajes = async () => {
      const response = await viajeService.getViajes();
      if (Array.isArray(response)) {
        setViajes(response);
        setMessage("Viajes obtenidos correctamente");
      } else {
        setError(response.message || "Error al obtener los viajes");
      }
    };
    fetchViajes();
  }, []);

  useEffect(() => {
    const fetchViajesSummary = async () => {
      const response = await viajeService.getViajesSummary();
      if (Array.isArray(response)) {
        setViajesSummary(response);
        setMessage("Viajes obtenidos correctamente");
      } else {
        setError(response.message || "Error al obtener los viajes");
      }
    };
    fetchViajesSummary();
  }, [viajes]);

  const crearViaje = async (viaje: ViajeDTO) => {
    const response = await viajeService.createViaje(viaje);
    if ("id" in response) {
      setViajes([...viajes, response]);
      setMessage("Viaje creado correctamente");
    } else {
      setError(response.message || "Error al crear el viaje");
    }
  };

  const updateViaje = async (id: number, updatedViaje: ViajeDTO) => {
    const response = await viajeService.updateViaje(id, updatedViaje);
    if ("id" in response) {
      setViajes(viajes.map((viaje) => (viaje.id === id ? response : viaje)));
      setSelectedViaje(response);
      setMessage("Viaje actualizado correctamente");
    } else {
      setError(response.message || "Error al actualizar el viaje");
    }
  };

  const deleteViaje = async (id: number) => {
    const response = await viajeService.deleteViaje(id);
    if ("id" in response) {
      setViajes(viajes.filter((viaje) => viaje.id !== id));
      setMessage("Viaje eliminado correctamente");
    } else {
      setError(response.message || "Error al eliminar el viaje");
    }
  };

  const selectViaje = (viaje: Viaje) => {
    setSelectedViaje(viaje);
  };

  const cargarViajeId = (id: number) => {
    const viaje = viajes.find((v) => v.id === id) || null;
    setSelectedViaje(viaje);
  };

  const resetMessage = () => {
    setMessage(null);
    setError(null);
  };

  return (
    <ViajeContext.Provider
      value={{
        viajes,
        crearViaje,
        updateViaje,
        deleteViaje,
        selectedViaje,
        selectViaje,
        viajesSummary,
        message,
        error,
        cargarViajeId,
        resetMessage,
      }}
    >
      {children}
    </ViajeContext.Provider>
  );
};

export const useViaje = () => {
  const context = useContext(ViajeContext);
  if (!context) {
    throw new Error("useViaje must be used within a ViajeProvider");
  }
  return context;
};
