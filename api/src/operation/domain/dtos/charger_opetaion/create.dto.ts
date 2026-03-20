export interface ChargerOperationCreateDto {
  id_travel: number;
}

export interface ChargerOperationUpdateDto {
  footboard: number;
  helper: number;
  grocer: number;
  boxes: number;
  weight: number;
  charger: number;
  travel_cost: number;
  date_canceled: Date | null;
}
