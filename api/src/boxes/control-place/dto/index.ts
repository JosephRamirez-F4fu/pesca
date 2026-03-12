export interface ControlPlaceDto {
  id_control_boxes: number;
  name: string;
  date_arrive: Date;
  concluded: boolean;
  hasLiquid: boolean;
}

export interface ControlPlaceResDto extends ControlPlaceDto {
  id: number;
}
