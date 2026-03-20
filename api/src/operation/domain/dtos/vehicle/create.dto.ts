export interface VehicleCreateDto {
  name: string;
  user: string;
  plate: string;
  type: string;
  phone: string;
}

export interface VehicleUpdateDto {
  name: string;
  user: string;
  plate: string;
  type: string;
  phone: string;
  is_active: boolean;
}
