export interface CreateVehicleRouteBalanceDto {
  balance: number;
  place: string;
  id_vehicle_route: number;
}

export interface UpdateVehicleRouteBalanceDto {
  balance: number;
  place: string;
}

export interface VehicleRouteBalanceResDto {
  id: number;
  balance: number;
  place: string;
  id_vehicle_route: number;
}
