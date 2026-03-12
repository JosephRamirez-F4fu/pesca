export interface CreateVehicleRoutesDto {
  id_vehicle_route: number;
  id_route: number;
  oil_use: number;
  oil_cost: number;
  createdAt: Date;
  is_concluded: string;
}
