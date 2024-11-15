export interface Pesca {
  id: number;
  id_viaje: number;
  pescado_tipo: string;
  pescado_cajas: number;
  precio: number;
  ganancia: number;
}

export interface PescaDTO {
  id_viaje: number;
  pescado_tipo: string;
  pescado_cajas: number;
  precio: number;
}
