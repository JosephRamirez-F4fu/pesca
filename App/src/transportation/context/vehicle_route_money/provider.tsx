import { VehicleRouteMoneyContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "../../dto/vehicle_route_money";
import { VehicleRouteMoneyService } from "../../services/vehicle_route_money.service";
import { useVehicleRoute } from "../vehicle-route";
import { useVehicleRouteCollection } from "../shared/useVehicleRouteCollection";

const service = new VehicleRouteMoneyService();

export const RoutesMoneyProvider = ({ children }: ContextProviderProps) => {
  const { routeSelected } = useVehicleRoute();
  const {
    items: routesMoney,
    selectedItem: routeMoneySelected,
    setSelectedItem: setRouteMoneySelected,
    refreshItems: refreshRouteMoney,
    createItem: createRouteMoney,
    updateItem: updateRouteMoney,
    deleteItem: deleteRouteMoney,
    getItem: getRouteMoney,
  } = useVehicleRouteCollection<VehicleRouteMoneyDto, VehicleRouteMoneyResDto>({
    routeSelectedId: routeSelected?.id,
    service,
  });

  return (
    <VehicleRouteMoneyContext.Provider
      value={{
        routesMoney,
        refreshRouteMoney,
        updateRouteMoney,
        deleteRouteMoney,
        createRouteMoney,
        getRouteMoney,
        routeMoneySelected,
        setRouteMoneySelected,
      }}
    >
      {children}
    </VehicleRouteMoneyContext.Provider>
  );
};
