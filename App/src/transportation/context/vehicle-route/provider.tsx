import { VehicleRouteContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useCallback, useEffect, useState } from "react";
import { VehicleRouteDto, VehicleRouteResDto } from "../../dto/vehicle-route";
import { VehicleRouteService } from "../../services/vehicle_route.service";

const service = new VehicleRouteService();

export const VehicleRouteProvider = ({ children }: ContextProviderProps) => {
  const [routes, setRoutes] = useState<VehicleRouteResDto[]>([]);
  const [routeSelected, setRouteSelected] = useState<VehicleRouteResDto | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRoutes, setFilteredRoutes] = useState<VehicleRouteResDto[]>(
    []
  );

  const getRoutes = useCallback(async () => {
    const data = await service.getVehicleRoutes();
    setRoutes(data);
    setRouteSelected((currentRoute) => {
      if (!currentRoute) return null;
      return data.find((route) => route.id === currentRoute.id) ?? null;
    });
  }, []);

  useEffect(() => {
    void getRoutes();
  }, [getRoutes]);

  useEffect(() => {
    const filtered = routes.filter(
      (route) =>
        route.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.createdAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoutes(filtered);
  }, [routes, searchTerm]);

  const createRoute = async (route: VehicleRouteDto) => {
    const data = await service.create(route);
    setRoutes((prevRoutes) => [...prevRoutes, data]);
  };

  const updateRoute = async (id: number, route: VehicleRouteDto) => {
    await service.update(id, route);
    await getRoutes();
  };

  const deleteRoute = async (id: number) => {
    await service.delete(id);
    setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
    setRouteSelected((prevRoute) => (prevRoute?.id === id ? null : prevRoute));
  };

  const getRoute = async (id: number): Promise<VehicleRouteResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRouteContext.Provider
      value={{
        routes,
        updateRoute,
        deleteRoute,
        createRoute,
        getRoute,
        routeSelected,
        setRouteSelected,
        searchTerm,
        setSearchTerm,
        filteredRoutes,
        getRoutes,
      }}
    >
      {children}
    </VehicleRouteContext.Provider>
  );
};
