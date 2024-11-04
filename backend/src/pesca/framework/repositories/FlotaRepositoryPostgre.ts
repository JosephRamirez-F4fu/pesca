import { IFlotaRepository, Flota, FlotaDTO } from "@/pesca/domain";
import { FlotaModel } from "@/pesca/framework/orm/models";
export class FlotaRepositoryPostgre implements IFlotaRepository {
  async getFlotas(): Promise<Flota[]> {
    const flotas = await FlotaModel.findAll();
    return flotas.map((flota) => {
      return {
        id: flota.id,
        nombre: flota.nombre,
        titular: flota.titular,
        capacidad: flota.capacidad,
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
      capacidad: flota.capacidad,
    };
  }
  async createFlota(flota: FlotaDTO): Promise<Flota> {
    const newFlota = await FlotaModel.create({
      nombre: flota.nombre,
      titular: flota.titular,
      capacidad: flota.capacidad,
    });
    console.log(newFlota);
    return {
      id: newFlota.id,
      nombre: newFlota.nombre,
      titular: newFlota.titular,
      capacidad: newFlota.capacidad,
    };
  }
  async updateFlota(id: number, flota: Flota): Promise<Flota | null> {
    const flotaToUpdate = await FlotaModel.findByPk(id);
    if (!flotaToUpdate) {
      return null;
    }
    flotaToUpdate.nombre = flota.nombre;
    flotaToUpdate.titular = flota.titular;
    flotaToUpdate.capacidad = flota.capacidad;
    await flotaToUpdate.save();
    return {
      id: flotaToUpdate.id,
      nombre: flotaToUpdate.nombre,
      titular: flotaToUpdate.titular,
      capacidad: flotaToUpdate.capacidad,
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
      capacidad: flotaToDelete.capacidad,
    };
  }
  async getFlotasByTitular(titular: string): Promise<Flota[]> {
    const flotas = await FlotaModel.findAll({ where: { titular } });
    return flotas.map((flota) => {
      return {
        id: flota.id,
        nombre: flota.nombre,
        titular: flota.titular,
        capacidad: flota.capacidad,
      };
    });
  }

  async getFlotasByNombre(nombre: string): Promise<Flota[] | null> {
    const flotas = await FlotaModel.findAll({ where: { nombre } });
    if (!flotas) {
      return null;
    }
    return flotas.map((flota) => {
      return {
        id: flota.id,
        nombre: flota.nombre,
        titular: flota.titular,
        capacidad : flota.capacidad,
      };
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
    return {
      id: flota.id,
      nombre: flota.nombre,
      titular: flota.titular,
      capacidad: flota.capacidad,
    };
  }
}
