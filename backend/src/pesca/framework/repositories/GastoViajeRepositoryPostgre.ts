import {
  IGastosViajeRepository,
  GastosViaje,
  GastosViajeDTO,
} from "@/pesca/domain";
import { GastosViajeModel, ViajeModel } from "@/pesca/framework/orm/models";
import { GastosViajeMapper } from "@/pesca/domain/mapper/GastosViajeMapper";

export class GastoViajeRepositoryPostgre extends IGastosViajeRepository {
  async getGastosViaje(): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll();
    return gastosViaje.map((gastoViaje) => {
      return GastosViajeMapper.toDomain(gastoViaje);
    });
  }

  async getGastosViajeById(id: number): Promise<GastosViaje | null> {
    const gastoViaje = await GastosViajeModel.findByPk(id);
    if (!gastoViaje) {
      return null;
    }
    return GastosViajeMapper.toDomain(gastoViaje);
  }

  async createGastosViaje(gastoViaje: GastosViajeDTO): Promise<GastosViaje> {
    const newGastoViaje = await GastosViajeModel.create(
      GastosViajeMapper.toPersistence(gastoViaje)
    );
    return GastosViajeMapper.toDomain(newGastoViaje);
  }

  async updateGastosViaje(
    id: number,
    gastoViaje: GastosViaje
  ): Promise<GastosViaje | null> {
    const gastoViajeToUpdate = await GastosViajeModel.findByPk(id);
    if (!gastoViajeToUpdate) {
      return null;
    }
    GastosViajeMapper.SetterToPersistance(gastoViajeToUpdate, gastoViaje);
    const gastosUpdated = await gastoViajeToUpdate.save();
    return GastosViajeMapper.toDomain(gastosUpdated);
  }

  async deleteGastosViaje(id: number) {
    const gastoViajeToDelete = await GastosViajeModel.findByPk(id);
    if (!gastoViajeToDelete) {
      return null;
    }
    await gastoViajeToDelete.destroy();
    return GastosViajeMapper.toDomain(gastoViajeToDelete);
  }

  async getGastosViajeByConcepto(concepto: string): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll({ where: { concepto } });
    return gastosViaje.map((gastoViaje) => {
      return GastosViajeMapper.toDomain(gastoViaje);
    });
  }

  async getGastosViajeByFlotaId(flotaId: number): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll({
      include: [
        {
          model: ViajeModel,
          where: { id_flota: flotaId },
        },
      ],
    });
    return gastosViaje.map((gastoViaje) => {
      return GastosViajeMapper.toDomain(gastoViaje);
    });
  }

  async getGastosViajeByViajeId(id: number): Promise<GastosViaje[]> {
    const gastosViaje = await GastosViajeModel.findAll({
      where: { id_viaje: id },
    });
    return gastosViaje.map((gastoViaje) => {
      return GastosViajeMapper.toDomain(gastoViaje);
    });
  }
}
