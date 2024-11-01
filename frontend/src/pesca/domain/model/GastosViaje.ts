export interface GastosViaje {
  id: number;
  id_viaje: number;
  concepto: string;
  importe: number;
}

export interface GastosViajeDTO {
  id_viaje: number;
  concepto: string;
  importe: number;
}
