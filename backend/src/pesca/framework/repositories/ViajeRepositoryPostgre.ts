import {
  Viaje,
  ViajeDTO,
  IViajeRepository,
  ViajeSummary,
} from "@/pesca/domain";
import {
  GastosViajeModel,
  PescaModel,
  ViajeModel,
} from "@/pesca/framework/orm/models";
import { ViajeMapper } from "@/pesca/domain/mapper/ViajeMapper";
import { db } from "@/pesca/framework/config";

export class ViajeRepositoryPostgre implements IViajeRepository {
  async createViaje(viaje: ViajeDTO): Promise<Viaje> {
    const viajeModel = await ViajeModel.create(
      ViajeMapper.toPersistence(viaje)
    );
    await viajeModel.save();
    return ViajeMapper.toDomain(viajeModel);
  }

  async getViajes(): Promise<Viaje[]> {
    const viajes = await ViajeModel.findAll();
    if (!viajes) {
      return [];
    }
    return viajes.map((viaje) => {
      return ViajeMapper.toDomain(viaje);
    });
  }
  async getViajeById(id: number): Promise<Viaje | null> {
    const viaje = await ViajeModel.findByPk(id);
    if (!viaje) {
      return null;
    }
    return ViajeMapper.toDomain(viaje);
  }

  async updateViaje(id: number, viaje: ViajeDTO): Promise<Viaje | null> {
    const viajeToUpdate = await ViajeModel.findByPk(id);
    if (!viajeToUpdate) {
      return null;
    }
    ViajeMapper.SetterToPersistance(viajeToUpdate, viaje);
    const viajeUpdated = await viajeToUpdate.save();
    return ViajeMapper.toDomain(viajeUpdated);
  }

  async deleteViaje(id: number): Promise<Viaje | null> {
    const viajeToDelete = await ViajeModel.findByPk(id);
    if (!viajeToDelete) {
      return null;
    }
    await viajeToDelete.destroy();
    return ViajeMapper.toDomain(viajeToDelete);
  }

  async getViajesByFlotaId(flotaId: number): Promise<Viaje[]> {
    const viajes = await ViajeModel.findAll({ where: { flota_id: flotaId } });
    return viajes.map((viaje) => {
      return ViajeMapper.toDomain(viaje);
    });
  }

  async getViajesSummary(): Promise<ViajeSummary[]> {
    const viajes = await ViajeModel.findAll({
      attributes: [
        "id",
        [
          db.literal(
            "SUM(costo_petroleo_cargado + costo_petroleo_consumido + costo_viveres)"
          ),
          "total_costo",
        ],
        "terminado",
      ],
      group: ["id"],
    });

    const pescaViajes = await PescaModel.findAll({
      attributes: [
        "id_viaje",
        [db.literal("SUM(precio*pescado_cajas*24)"), "total_bruta"],
      ],
      group: ["id_viaje"],
    });

    const gastosViajes = await GastosViajeModel.findAll({
      attributes: ["id_viaje", [db.literal("SUM(importe)"), "total_gastos"]],
      group: ["id_viaje"],
    });

    const pescaSummary = pescaViajes.map((pesca) => {
      return {
        id: pesca.get("id_viaje"),
        total_bruta: Number(pesca.get("total_bruta")),
      };
    });

    const viajesSummary = viajes.map((viaje) => {
      return {
        id: viaje.get("id"),
        total_costo: Number(viaje.get("total_costo")),
        terminado: viaje.get("terminado"),
      };
    });

    const gastosSummary = gastosViajes.map((gasto) => {
      return {
        id: gasto.get("id_viaje"),
        total_gastos: Number(gasto.get("total_gastos")),
      };
    });

    const summary = viajesSummary.map((viaje) => {
      const pesca = pescaSummary.find((p) => p.id === viaje.id);
      const gasto = gastosSummary.find((g) => g.id === viaje.id);
      return {
        id: viaje.id,
        total_costo: viaje.total_costo,
        total_gastos: gasto?.total_gastos || 0,
        total_bruto: pesca?.total_bruta || 0,
        total_ganancia: (pesca?.total_bruta ?? 0) - viaje.total_costo,
        total_ganancia_neta:
          ((pesca?.total_bruta ?? 0) - viaje.total_costo) / 2,
        terminado: viaje.terminado,
      };
    });
    return summary;
  }
}
