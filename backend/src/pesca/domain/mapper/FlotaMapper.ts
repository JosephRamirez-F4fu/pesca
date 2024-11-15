import { Flota, FlotaDTO } from "@/pesca/domain/model";
import { FlotaModel } from "@/pesca/framework/orm/models";
export class FlotaMapper {
  static toDomain(flotaModel: FlotaModel): Flota {
    return {
      id: flotaModel.id,
      nombre: flotaModel.nombre,
      capacidad: flotaModel.capacidad,
      titular: flotaModel.titular,
    };
  }
  static toPersistence(flota: FlotaDTO) {
    return {
      nombre: flota.nombre,
      titular: flota.titular,
      capacidad: flota.capacidad,
    };
  }
  static SetterToPersistance(flotaModel: FlotaModel, flota: FlotaDTO) {
    flotaModel.nombre = flota.nombre;
    flotaModel.titular = flota.titular;
    flotaModel.capacidad = flota.capacidad;
  }
}
