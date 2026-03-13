export interface VehicleRouteBalanceDto {
  balance: number;
  place: string;
  createdAt: Date;
  updatedAt: Date;
  id_vehicle_route: number;
}

export interface VehicleRouteBalanceResDto {
  id: number;
  balance: number;
  place: string;
  id_vehicle_route: number;
}
