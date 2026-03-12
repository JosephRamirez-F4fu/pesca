import { VehicleRouteBalanceContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import {
  VehicleRouteBalanceDto,
  VehicleRouteBalanceResDto,
} from "../../dto/vehicle_route_balance";
import { useVehicleRoute } from "../vehicle-route";
import { VehicleRouteBalanceService } from "../../services/vehicle_route_balance.service";
import { useVehicleRouteCollection } from "../shared/useVehicleRouteCollection";

const service = new VehicleRouteBalanceService();

export const RoutesBalanceProvider = ({ children }: ContextProviderProps) => {
  const { routeSelected } = useVehicleRoute();
  const {
    items: vehicleRouteBalance,
    selectedItem: vehicleRouteBalanceSelected,
    setSelectedItem: setVehicleRouteBalanceSelected,
    refreshItems: refreshVehicleRouteBalance,
    createItem: createVehicleRouteBalance,
    updateItem: updateVehicleRouteBalance,
    deleteItem: deleteVehicleRouteBalance,
    getItem: getVehicleRouteBalance,
  } = useVehicleRouteCollection<
    VehicleRouteBalanceDto,
    VehicleRouteBalanceResDto
  >({
    routeSelectedId: routeSelected?.id,
    service,
  });

  return (
    <VehicleRouteBalanceContext.Provider
      value={{
        vehicleRouteBalance,
        refreshVehicleRouteBalance,
        updateVehicleRouteBalance,
        deleteVehicleRouteBalance,
        createVehicleRouteBalance,
        getVehicleRouteBalance,
        vehicleRouteBalanceSelected,
        setVehicleRouteBalanceSelected,
      }}
    >
      {children}
    </VehicleRouteBalanceContext.Provider>
  );
};
