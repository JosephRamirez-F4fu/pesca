export interface TravelCreateDto {
  oil_charge: number;
  oil_charger_price: number;
  oil_consume: number;
  oil_consume_price: number;
  provisions_cost: number;
  gas_cylinder_cost: number;
  code: string;
  createdAt: Date;
  is_concluded: boolean;
  oil_remaining: number;
  oil_date_canceled: Date | null;
  fishing_date_canceled: Date | null;
  oil_vehicle: number;
  oil_vehicle_price: number;
  oil_vehicle_date_canceled: Date | null;
  id_boat: number;
}
