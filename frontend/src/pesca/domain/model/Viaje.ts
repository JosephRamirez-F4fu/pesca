export interface Viaje {
  id: number;
  petroleo_cargado: number;
  petroleo_consumido: number;
  petroleo_restante: number;
  flota_id: number;
}

export interface ViajeDTO {
  petroleo_cargado: number;
  petroleo_consumido: number;
  petroleo_restante: number;
  flota_id: number;
}
