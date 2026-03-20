import { RoutesContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useCallback, useEffect, useState } from "react";
import { RouteDto, RouteResDto } from "../../dto/routes";
import { RouteService } from "../../services/routes.service";

const service = new RouteService();

export const RoutesProvider = ({ children }: ContextProviderProps) => {
  const [routes, setRoutes] = useState<RouteResDto[]>([]);
  const [routeSelected, setRouteSelected] = useState<RouteResDto | null>(null);

  const refreshRoutes = useCallback(async () => {
    const data = await service.getVehicles();
    setRoutes(data);
  }, []);

  useEffect(() => {
    void refreshRoutes();
  }, [refreshRoutes]);

  const createRoute = async (route: RouteDto) => {
    const data = await service.create(route);
    setRoutes((prevRoutes) => [...prevRoutes, data]);
  };

  const updateRoute = async (id: number, route: RouteDto) => {
    await service.update(id, route);
    setRoutes((prevRoutes) =>
      prevRoutes.map((r) => (r.id === id ? { ...r, ...route } : r))
    );
  };

  const deleteRoute = async (id: number) => {
    await service.delete(id);
    setRoutes((prevRoutes) => prevRoutes.filter((r) => r.id !== id));
    setRouteSelected((prevRoute) => (prevRoute?.id === id ? null : prevRoute));
  };

  const getRoute = async (id: number): Promise<RouteResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <RoutesContext.Provider
      value={{
        routes,
        refreshRoutes,
        updateRoute,
        deleteRoute,
        createRoute,
        getRoute,
        routeSelected,
        setRouteSelected,
      }}
    >
      {children}
    </RoutesContext.Provider>
  );
};
