export interface Flota {
  id: number;
  nombre: string;
  titular: string;
}

export interface viaje {
  id: number;
  petroleo_cargado: number;
  petroleo_consumido: number;
  petrleo_restante: number;
  flota_id: number;
}

export interface pesca {
  id: number;
  id_viaje: number;
  pescado_tipo: string;
  pescado_cajas: number;
}

export interface gastos_viaje {
  id: number;
  id_viaje: number;
  concepto: string;
  importe: number;
}
