import { VehicleRouteDetail } from "../entities/vehicle_route_detail";
export interface VehicleRoute {
  id: number;
  state: string;
  is_concluded: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleName {
  name: string;
}

export interface VehicleRouteWithVehicle extends VehicleRoute {
  vehicle: VehicleName;
}

export interface VehicleRouteWithDetailAndVehicle
  extends VehicleRouteWithVehicle {
  vehicle_route_detail: VehicleRouteDetail | null;
}
