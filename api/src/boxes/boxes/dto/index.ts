export interface BoxesDto {
  id_control_place: number;
  color: string;
  name: string;
  quantity: number;
}

export interface BoxesUpdateDto {
  color: string;
  name: string;
  quantity: number;
}

export interface BoxesResDto {
  id: number;
  id_control_place: number;
  color: string;
  name: string;
  quantity: number;
}
