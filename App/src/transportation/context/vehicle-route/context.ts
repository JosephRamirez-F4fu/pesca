import { createContext, Dispatch, SetStateAction } from "react";
import { VehicleRouteDto, VehicleRouteResDto } from "./../../dto/vehicle-route";
export interface VehicleRouteContextProps {
  routes: VehicleRouteResDto[];
  updateRoute: (id: number, route: VehicleRouteDto) => Promise<void>;
  deleteRoute: (id: number) => Promise<void>;
  createRoute: (route: VehicleRouteDto) => Promise<void>;
  getRoute: (id: number) => Promise<VehicleRouteResDto>;
  routeSelected: VehicleRouteResDto | null;
  setRouteSelected: Dispatch<SetStateAction<VehicleRouteResDto | null>>;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  filteredRoutes: VehicleRouteResDto[];
  getRoutes: () => Promise<void>;
}

export const VehicleRouteContext =
  createContext<VehicleRouteContextProps | null>(null);
