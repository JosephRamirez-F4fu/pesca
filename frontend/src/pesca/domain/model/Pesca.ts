export interface Pesca {
  id: number;
  id_viaje: number;
  pescado_tipo: string;
  pescado_cajas: number;
}

export interface PescaDTO {
  id_viaje: number;
  pescado_tipo: string;
  pescado_cajas: number;
}
