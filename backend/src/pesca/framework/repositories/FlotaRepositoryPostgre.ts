import { IFlotaRepository, Flota, FlotaDTO } from "@/pesca/domain";
import { FlotaModel } from "@/pesca/framework/orm/models";
import { FlotaMapper } from "@/pesca/domain/mapper/FlotaMapper";
export class FlotaRepositoryPostgre implements IFlotaRepository {
  async getFlotas(): Promise<Flota[]> {
    const flotas = await FlotaModel.findAll();
    return flotas.map((flota) => {
      return FlotaMapper.toDomain(flota);
    });
  }
  async getFlotaById(id: number): Promise<Flota | null> {
    const flota = await FlotaModel.findByPk(id);
    if (!flota) {
      return null;
    }
    return FlotaMapper.toDomain(flota);
  }
  async createFlota(flota: FlotaDTO): Promise<Flota> {
    const newFlota = await FlotaModel.create(FlotaMapper.toPersistence(flota));
    return FlotaMapper.toDomain(newFlota);
  }
  async updateFlota(id: number, flota: Flota): Promise<Flota | null> {
    const flotaToUpdate = await FlotaModel.findByPk(id);
    if (!flotaToUpdate) {
      return null;
    }
    FlotaMapper.SetterToPersistance(flotaToUpdate, flota);
    const flotaUpdated = await flotaToUpdate.save();
    return FlotaMapper.toDomain(flotaUpdated);
  }
  async deleteFlota(id: number): Promise<Flota | null> {
    const flotaToDelete = await FlotaModel.findByPk(id);
    if (!flotaToDelete) {
      return null;
    }
    await flotaToDelete.destroy();
    return FlotaMapper.toDomain(flotaToDelete);
  }
  async getFlotasByTitular(titular: string): Promise<Flota[]> {
    const flotas = await FlotaModel.findAll({ where: { titular } });
    return flotas.map((flota) => {
      return FlotaMapper.toDomain(flota);
    });
  }

  async getFlotasByNombre(nombre: string): Promise<Flota[]> {
    const flotas = await FlotaModel.findAll({ where: { nombre } });
    return flotas.map((flota) => {
      return FlotaMapper.toDomain(flota);
    });
  }

  async getFlotaByNombreAndTitular(
    nombre: string,
    titular: string
  ): Promise<Flota | null> {
    const flota = await FlotaModel.findOne({ where: { nombre, titular } });
    if (!flota) {
      return null;
    }
    return FlotaMapper.toDomain(flota);
  }
}
