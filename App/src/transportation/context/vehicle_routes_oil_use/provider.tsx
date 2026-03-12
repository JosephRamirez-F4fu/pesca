import { VehicleRoutesOilUseContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import {
  VehicleRoutesOilUseDto,
  VehicleRoutesOilUseResDto,
} from "../../dto/vehicle_routes_oil_use";
import { VehicleRoutesOilUseService } from "../../services/vehicle_routes_oil_use.service";
import { useVehicleRoute } from "../vehicle-route";
import { useVehicleRouteCollection } from "../shared/useVehicleRouteCollection";

const service = new VehicleRoutesOilUseService();

export const RoutesOilUseProvider = ({ children }: ContextProviderProps) => {
  const { routeSelected } = useVehicleRoute();
  const {
    items: routesOilUse,
    selectedItem: routeOilUseSelected,
    setSelectedItem: setRouteOilUseSelected,
    refreshItems: refreshRouteOilUse,
    createItem: createRouteOilUse,
    updateItem: updateRouteOilUse,
    deleteItem: deleteRouteOilUse,
    getItem: getRouteOilUse,
  } = useVehicleRouteCollection<
    VehicleRoutesOilUseDto,
    VehicleRoutesOilUseResDto
  >({
    routeSelectedId: routeSelected?.id,
    service,
  });

  return (
    <VehicleRoutesOilUseContext.Provider
      value={{
        routesOilUse,
        refreshRouteOilUse,
        updateRouteOilUse,
        deleteRouteOilUse,
        createRouteOilUse,
        getRouteOilUse,
        routeOilUseSelected,
        setRouteOilUseSelected,
      }}
    >
      {children}
    </VehicleRoutesOilUseContext.Provider>
  );
};
