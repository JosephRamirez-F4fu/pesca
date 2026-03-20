export interface VehicleRouteDetail {
  id: number;
  id_vehicle_route: number;
  dateInit: Date;
  dateEnd: Date | null;
  taxes_out: number;
  taxes_in: number;
  point_charge: string | null;
  who_destination: string | null;
  destiny: string | null;
  createdAt: Date;
  updatedAt: Date;
  id_next_route: number | null;
  changeGiven: boolean;
}
