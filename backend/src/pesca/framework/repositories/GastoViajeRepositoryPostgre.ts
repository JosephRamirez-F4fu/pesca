import { IGastosViajeRepository, GastosViaje, GastosViajeDTO } from "@/pesca/domain";
import { GastosViajeModel,ViajeModel } from "@/pesca/framework/orm/models";

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

  async getGastosViajeById(id: number): Promise<GastosViaje | null> {
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

  async createGastosViaje(gastoViaje: GastosViajeDTO): Promise<GastosViaje> {
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

  async updateGastosViaje(
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

  async deleteGastosViaje(id: number): Promise<GastosViaje|null> {
    const gastoViajeToDelete = await GastosViajeModel.findByPk(id);
    if (!gastoViajeToDelete) {
      return null;
    }
    await gastoViajeToDelete.destroy();
    return {
      id: gastoViajeToDelete.id,
      concepto: gastoViajeToDelete.concepto,
      importe: gastoViajeToDelete.importe,
      id_viaje: gastoViajeToDelete.id_viaje,
    };
  }

  async getGastosViajeByConcepto(concepto: string): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll({ where: { concepto } });
    return gastosViaje.map((gastoViaje) => {
      return {
        id: gastoViaje.id,
        concepto: gastoViaje.concepto,
        importe: gastoViaje.importe,
        id_viaje: gastoViaje.id_viaje,
      };
    });
  }

  async getGastosViajeByFlotaId(flotaId: number): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll(
      {
        include: [
          {
            model: ViajeModel,
            where: { id_flota: flotaId },
          },
        ],
      }
    );
    return gastosViaje.map((gastoViaje) => {
      return {
        id: gastoViaje.id,
        concepto: gastoViaje.concepto,
        importe: gastoViaje.importe,
        id_viaje: gastoViaje.id_viaje,
      };
    });
  }

  async getGastosViajeByViajeId(id: number): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll({ where: { id_viaje: id } });
    return gastosViaje.map((gastoViaje) => {
      return {
        id: gastoViaje.id,
        concepto: gastoViaje.concepto,
        importe: gastoViaje.importe,
        id_viaje: gastoViaje.id_viaje,
      };
    });
  }

}
