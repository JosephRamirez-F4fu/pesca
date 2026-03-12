import { VehicleRoutesContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import {
  VehicleRoutesDto,
  VehicleRoutesResDto,
} from "../../dto/vehicle-routes";
import { VehicleRoutesService } from "../../services/vehicle_routes.service";
import { useVehicleRoute } from "../vehicle-route/useContext";
import { useVehicleRouteCollection } from "../shared/useVehicleRouteCollection";

const service = new VehicleRoutesService();

export const VehicleRoutesProvider = ({ children }: ContextProviderProps) => {
  const { routeSelected } = useVehicleRoute();
  const {
    items: vehicleRoutes,
    selectedItem: vehicleRoutesSelected,
    setSelectedItem: setVehicleRoutesSelected,
    refreshItems: refreshVehicleRoutes,
    createItem: createRoute,
    updateItem: updateRoute,
    deleteItem: deleteRoute,
    getItem: getRoute,
  } = useVehicleRouteCollection<VehicleRoutesDto, VehicleRoutesResDto>({
    routeSelectedId: routeSelected?.id,
    service,
  });

  return (
    <VehicleRoutesContext.Provider
      value={{
        vehicleRoutes,
        refreshVehicleRoutes,
        updateRoute,
        deleteRoute,
        createRoute,
        getRoute,
        vehicleRoutesSelected,
        setVehicleRoutesSelected,
      }}
    >
      {children}
    </VehicleRoutesContext.Provider>
  );
};
