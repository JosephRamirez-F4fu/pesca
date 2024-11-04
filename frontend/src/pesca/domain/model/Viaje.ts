export interface Viaje {
  id: number;
  petroleo_cargado: number;
  petroleo_consumido: number;
  petroleo_restante: number;
  flota_id: number;
  finalizado: boolean;
}

export interface ViajeDTO {
  petroleo_cargado: number;
  petroleo_consumido: number;
  petroleo_restante: number;
  flota_id: number;
  finalizado: boolean;
}

export interface ViajeSummary {
  id: number;
  flota: string;
  petroleo_cargado: number;
  petroleo_consumido: number;
  flota_capacidad: number;
  finalizado: boolean;
  gasto_total: number;
  pesca_total: number;
}
