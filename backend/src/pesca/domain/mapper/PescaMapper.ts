import { Pesca, PescaDTO } from "@/pesca/domain";
import { PescaModel } from "@/pesca/framework/orm";

export class PescaMapper {
  static toDomain(pescaModel: PescaModel): Pesca {
    return {
      id: pescaModel.id,
      id_viaje: pescaModel.id_viaje,
      pescado_tipo: pescaModel.pescado_tipo,
      pescado_cajas: pescaModel.pescado_cajas,
      precio: pescaModel.precio,
    };
  }
  static toPersistence(pesca: PescaDTO) {
    return {
      id_viaje: pesca.id_viaje,
      pescado_tipo: pesca.pescado_tipo,
      pescado_cajas: pesca.pescado_cajas,
      precio: pesca.precio,
    };
  }
  static SetterToPersistance(pescaModel: PescaModel, pesca: PescaDTO) {
    pescaModel.id_viaje = pesca.id_viaje;
    pescaModel.pescado_tipo = pesca.pescado_tipo;
    pescaModel.pescado_cajas = pesca.pescado_cajas;
    pescaModel.precio = pesca.precio;
  }
}
