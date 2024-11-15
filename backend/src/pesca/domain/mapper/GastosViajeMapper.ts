import { GastosViaje, GastosViajeDTO } from "@/pesca/domain/model";
import { GastosViajeModel } from "@/pesca/framework/orm/models";

export class GastosViajeMapper {
  static toDomain(gastosViajeModel: GastosViajeModel): GastosViaje {
    return {
      id: gastosViajeModel.id,
      id_viaje: gastosViajeModel.id_viaje,
      concepto: gastosViajeModel.concepto,
      importe: gastosViajeModel.importe,
    };
  }

  static toPersistence(gastosViaje: GastosViajeDTO) {
    return {
      id_viaje: gastosViaje.id_viaje,
      concepto: gastosViaje.concepto,
      importe: gastosViaje.importe,
    };
  }

  static SetterToPersistance(
    gastosViajeModel: GastosViajeModel,
    gastosViaje: GastosViajeDTO
  ) {
    gastosViajeModel.id_viaje = gastosViaje.id_viaje;
    gastosViajeModel.concepto = gastosViaje.concepto;
    gastosViajeModel.importe = gastosViaje.importe;
  }
}
