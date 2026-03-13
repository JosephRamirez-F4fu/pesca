export interface ControlBoxesDto {
  code: string;
  date_arrive: Date;
  concluded: boolean;
}

export interface ControlBoxesCreateDto {
  code: string;
  date_arrive: Date;
}

export interface ControlBoxesResDto {
  id: number;
  code: string;
  date_arrive: Date;
  concluded: boolean;
}
