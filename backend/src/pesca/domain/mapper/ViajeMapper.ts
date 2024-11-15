import { Viaje, ViajeDTO } from "@/pesca/domain/model";
import { ViajeModel } from "@/pesca/framework/orm/models";

export class ViajeMapper {
  static toDomain(viajeModel: ViajeModel): Viaje {
    return {
      id: viajeModel.id,
      petroleo_cargado: viajeModel.petroleo_cargado,
      petroleo_consumido: viajeModel.petroleo_consumido,
      costo_petroleo_cargado: viajeModel.costo_petroleo_cargado,
      costo_petroleo_consumido: viajeModel.costo_petroleo_consumido,
      costo_viveres: viajeModel.costo_viveres,
      flota_id: viajeModel.flota_id,
      terminado: viajeModel.terminado,
    };
  }
  static toPersistence(viaje: ViajeDTO) {
    return {
      petroleo_cargado: viaje.petroleo_cargado,
      petroleo_consumido: viaje.petroleo_consumido,
      costo_petroleo_cargado: viaje.costo_petroleo_cargado,
      costo_petroleo_consumido: viaje.costo_petroleo_consumido,
      costo_viveres: viaje.costo_viveres,
      flota_id: viaje.flota_id,
      terminado: viaje.terminado,
    };
  }
  static SetterToPersistance(viajeModel: ViajeModel, viaje: ViajeDTO) {
    viajeModel.petroleo_cargado = viaje.petroleo_cargado;
    viajeModel.petroleo_consumido = viaje.petroleo_consumido;
    viajeModel.costo_petroleo_cargado = viaje.costo_petroleo_cargado;
    viajeModel.costo_petroleo_consumido = viaje.costo_petroleo_consumido;
    viajeModel.costo_viveres = viaje.costo_viveres;
    viajeModel.flota_id = viaje.flota_id;
    viajeModel.terminado = viaje.terminado;
  }
}
