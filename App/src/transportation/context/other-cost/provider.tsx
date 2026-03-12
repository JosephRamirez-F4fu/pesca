import { VehicleRouteOtherCostContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import {
  VehicleRouteOtherCostDto,
  VehicleRouteOtherCostResDto,
} from "../../dto/other-cost";
import { VehicleRouteOtherCostService } from "../../services/vehicle_route_other_cost.service";

import { useVehicleRoute } from "../vehicle-route";
import { useVehicleRouteCollection } from "../shared/useVehicleRouteCollection";

const service = new VehicleRouteOtherCostService();

export const VehicleRouteOtherCostProvider = ({
  children,
}: ContextProviderProps) => {
  const { routeSelected } = useVehicleRoute();
  const {
    items: costs,
    selectedItem: costSelected,
    setSelectedItem: setCostSelected,
    refreshItems: refreshCosts,
    createItem: createCost,
    updateItem: updateCost,
    deleteItem: deleteCost,
    getItem: getCost,
  } = useVehicleRouteCollection<
    VehicleRouteOtherCostDto,
    VehicleRouteOtherCostResDto
  >({
    routeSelectedId: routeSelected?.id,
    service,
  });

  return (
    <VehicleRouteOtherCostContext.Provider
      value={{
        costs,
        refreshCosts,
        createCost,
        updateCost,
        deleteCost,
        getCost,
        costSelected,
        setCostSelected,
      }}
    >
      {children}
    </VehicleRouteOtherCostContext.Provider>
  );
};
