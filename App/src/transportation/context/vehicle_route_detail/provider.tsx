import { VehicleRouteDetailContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useCallback, useEffect, useState } from "react";
import {
  VehicleRouteDetailDto,
  VehicleRouteDetailResDto,
} from "../../dto/vehicle_route_detail";
import { VehicleRouteDetailService } from "../../services/vehicle_route_detail.service";
import { useVehicleRoute } from "../vehicle-route";

const service = new VehicleRouteDetailService();

export const RoutesDetailProvider = ({ children }: ContextProviderProps) => {
  const [routeDetail, setRouteDetail] =
    useState<VehicleRouteDetailResDto | null>(null);
  const { routeSelected, setRouteSelected } = useVehicleRoute();

  const refreshRouteDetail = useCallback(async () => {
    if (!routeSelected) {
      setRouteDetail(null);
      return;
    }

    const data = await service.getByVehicleRouteId(routeSelected.id);
    setRouteDetail(data);
    setRouteSelected((prevRoute) =>
      prevRoute?.id === routeSelected.id
        ? {
            ...prevRoute,
            vehicle_route_detail: data,
          }
        : prevRoute
    );
  }, [routeSelected, setRouteSelected]);

  useEffect(() => {
    void refreshRouteDetail();
  }, [refreshRouteDetail]);

  const updateRoute = async (id: number, route: VehicleRouteDetailDto) => {
    await service.update(id, route);
    const updatedRoute = await service.getById(id);
    setRouteDetail(updatedRoute);
    setRouteSelected((prevRoute) =>
      prevRoute?.id === updatedRoute.id_vehicle_route
        ? {
            ...prevRoute,
            vehicle_route_detail: updatedRoute,
          }
        : prevRoute
    );
  };

  const getRoute = async (id: number): Promise<VehicleRouteDetailResDto> => {
    const data = await service.getById(id);
    return data;
  };

  const VehicleUsegeOilByDestination = async (destination: string) => {
    const data = await service.getVehicleRouteUseOilDestiny(destination);
    return data;
  };

  const GetNextRoute = async (
    id: number
  ): Promise<VehicleRouteDetailResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRouteDetailContext.Provider
      value={{
        routeDetail,
        refreshRouteDetail,
        updateRoute,
        getRoute,
        setRouteDetail,
        VehicleUsegeOilByDestination,
        GetNextRoute,
      }}
    >
      {children}
    </VehicleRouteDetailContext.Provider>
  );
};
