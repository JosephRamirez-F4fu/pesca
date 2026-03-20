export interface VehicleRoutesOilUseDto {
  id_vehicle_route: number;
  description: string;
  oil_use: number;
}

export interface VehicleRoutesOilUseResDto {
  id: number;
  id_vehicle_route: number;
  description: string;
  oil_use: number;
}
