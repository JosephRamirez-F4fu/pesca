import { IFlotaRepository, Flota } from "@/pesca/domain";
import { FlotaModel } from "@/pesca/framework/orm/models";
export class FlotaRepositoryPostgre implements IFlotaRepository {
  async getFlotas(): Promise<Flota[]> {
    const flotas = await FlotaModel.findAll();
    return flotas.map((flota) => {
      return {
        id: flota.id,
        nombre: flota.nombre,
        titular: flota.titular,
      };
    });
  }
  async getFlotaById(id: number): Promise<Flota | null> {
    const flota = await FlotaModel.findByPk(id);
    if (!flota) {
      return null;
    }
    return {
      id: flota.id,
      nombre: flota.nombre,
      titular: flota.titular,
    };
  }
  async createFlota(flota: Flota): Promise<Flota> {
    const newFlota = await FlotaModel.create({
      nombre: flota.nombre,
      titular: flota.titular,
    });
    return {
      id: newFlota.id,
      nombre: newFlota.nombre,
      titular: newFlota.titular,
    };
  }
  async updateFlota(id: number, flota: Flota): Promise<Flota | null> {
    const flotaToUpdate = await FlotaModel.findByPk(id);
    if (!flotaToUpdate) {
      return null;
    }
    flotaToUpdate.nombre = flota.nombre;
    flotaToUpdate.titular = flota.titular;
    await flotaToUpdate.save();
    return {
      id: flotaToUpdate.id,
      nombre: flotaToUpdate.nombre,
      titular: flotaToUpdate.titular,
    };
  }
  async deleteFlota(id: number): Promise<Flota | null> {
    const flotaToDelete = await FlotaModel.findByPk(id);
    if (!flotaToDelete) {
      return null;
    }
    await flotaToDelete.destroy();
    return {
      id: flotaToDelete.id,
      nombre: flotaToDelete.nombre,
      titular: flotaToDelete.titular,
    };
  }
  async getFlotasByTitular(titular: string): Promise<Flota[]> {
    const flotas = await FlotaModel.findAll({ where: { titular } });
    return flotas.map((flota) => {
      return {
        id: flota.id,
        nombre: flota.nombre,
        titular: flota.titular,
      };
    });
  }

  async getFlotaByNombre(nombre: string): Promise<Flota | null> {
    const flota = await FlotaModel.findOne({ where: { nombre } });
    if (!flota) {
      return null;
    }
    return {
      id: flota.id,
      nombre: flota.nombre,
      titular: flota.titular,
    };
  }
}