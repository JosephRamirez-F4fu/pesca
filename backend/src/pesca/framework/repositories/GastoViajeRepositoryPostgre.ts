import { IGastosViajeRepository, GastosViaje } from "@/pesca/domain";
import { GastosViajeModel } from "@/pesca/framework/orm/models";

export class GastoViajeRepositoryPostgre extends IGastosViajeRepository {
  async getGastosViaje(): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll();
    return gastosViaje.map((gastoViaje) => {
      return {
        id: gastoViaje.id,
        concepto: gastoViaje.concepto,
        importe: gastoViaje.importe,
        id_viaje: gastoViaje.id_viaje,
      };
    });
  }

  async getGastoViajeById(id: number): Promise<GastosViaje | null> {
    const gastoViaje = await GastosViajeModel.findByPk(id);
    if (!gastoViaje) {
      return null;
    }
    return {
      id: gastoViaje.id,
      concepto: gastoViaje.concepto,
      importe: gastoViaje.importe,
      id_viaje: gastoViaje.id_viaje,
    };
  }

  async createGastoViaje(gastoViaje: GastosViaje): Promise<GastosViaje> {
    const newGastoViaje = await GastosViajeModel.create({
      concepto: gastoViaje.concepto,
      importe: gastoViaje.importe,
      id_viaje: gastoViaje.id_viaje,
    });
    return {
      id: newGastoViaje.id,
      concepto: newGastoViaje.concepto,
      importe: newGastoViaje.importe,
      id_viaje: newGastoViaje.id_viaje,
    };
  }

  async updateGastoViaje(
    id: number,
    gastoViaje: GastosViaje
  ): Promise<GastosViaje | null> {
    const gastoViajeToUpdate = await GastosViajeModel.findByPk(id);
    if (!gastoViajeToUpdate) {
      return null;
    }
    gastoViajeToUpdate.concepto = gastoViaje.concepto;
    gastoViajeToUpdate.importe = gastoViaje.importe;
    gastoViajeToUpdate.id_viaje = gastoViaje.id_viaje;

    await gastoViajeToUpdate.save();
    return {
      id: gastoViajeToUpdate.id,
      concepto: gastoViajeToUpdate.concepto,
      importe: gastoViajeToUpdate.importe,
      id_viaje: gastoViajeToUpdate.id_viaje,
    };
  }
}
