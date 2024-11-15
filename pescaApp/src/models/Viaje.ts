export interface Viaje {
  id: number;
  petroleo_cargado: number;
  petroleo_consumido: number;
  costo_petroleo_consumido: number;
  costo_petroleo_cargado: number;
  costo_viveres: number;
  terminado: boolean;
  flota_id: number;
}

export interface ViajeDTO {
  petroleo_cargado: number;
  petroleo_consumido: number;
  costo_petroleo_consumido: number;
  costo_petroleo_cargado: number;
  costo_viveres: number;
  terminado: boolean;
  flota_id: number;
}

export interface ViajeSummary {
  id: number;
  total_costo: number;
  total_gastos: number;
  total_bruto: number;
  total_ganancia: number;
  total_ganancia_neta: number;
  terminado: boolean;
}
