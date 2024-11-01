import { Pesca, IPescaRepository, PescaDTO } from "@/pesca/domain";
import { PescaModel,ViajeModel } from "@/pesca/framework/orm/models";

export class PescaRepositoryPostgre implements IPescaRepository {
  async getPescas(): Promise<Pesca[]> {
    const pescas = await PescaModel.findAll();
    return pescas.map((pesca) => {
      return {
        id: pesca.id,
        id_viaje: pesca.id_viaje,
        pescado_tipo: pesca.pescado_tipo,
        pescado_cajas: pesca.pescado_cajas,
        precio: pesca.pescado_precio,
      };
    });
  }
  async createPesca(pesca: PescaDTO): Promise<Pesca> {
    const pescaCreated = await PescaModel.create({
      id_viaje: pesca.id_viaje,
      pescado_tipo: pesca.pescado_tipo,
      pescado_cajas: pesca.pescado_cajas,
    });
    return {
      id: pescaCreated.id,
      id_viaje: pescaCreated.id_viaje,
      pescado_tipo: pescaCreated.pescado_tipo,
      pescado_cajas: pescaCreated.pescado_cajas,
      precio: pescaCreated.pescado_precio,
    };
  }

  async updatePesca(id: number, pesca: PescaDTO): Promise<Pesca | null> {
    const pescaToUpdate = await PescaModel.findByPk(id);
    if (!pescaToUpdate) {
      return null;
    }
    pescaToUpdate.id_viaje = pesca.id_viaje;
    pescaToUpdate.pescado_tipo = pesca.pescado_tipo;
    pescaToUpdate.pescado_cajas = pesca.pescado_cajas;
    await pescaToUpdate.save();
    return {
      id: pescaToUpdate.id,
      id_viaje: pescaToUpdate.id_viaje,
      pescado_tipo: pescaToUpdate.pescado_tipo,
      pescado_cajas: pescaToUpdate.pescado_cajas,
      precio: pescaToUpdate.pescado_precio,
    };
  }

  async deletePesca(id: number): Promise<Pesca | null> {
    const pescaToDelete = await PescaModel.findByPk(id);
    if (!pescaToDelete) {
      return null;
    }
    await pescaToDelete.destroy();
    return {
      id: pescaToDelete.id,
      id_viaje: pescaToDelete.id_viaje,
      pescado_tipo: pescaToDelete.pescado_tipo,
      pescado_cajas: pescaToDelete.pescado_cajas,
      precio: pescaToDelete.pescado_precio,
    };
  }

  async getPescaById(id: number): Promise<Pesca | null> {
    const pesca = await PescaModel.findByPk(id);
    if (!pesca) {
      return null;
    }
    return {
      id: pesca.id,
      id_viaje: pesca.id_viaje,
      pescado_tipo: pesca.pescado_tipo,
      pescado_cajas: pesca.pescado_cajas,
      precio: pesca.pescado_precio,
    };
  }

  async getPescaByViajeId(id: number): Promise<Pesca[] | null> {
    const pescas = await PescaModel.findAll({ where: { id_viaje: id } });
    if (!pescas) {
      return null;
    }
    return pescas.map((pesca) => {
      return {
        id: pesca.id,
        id_viaje: pesca.id_viaje,
        pescado_tipo: pesca.pescado_tipo,
        pescado_cajas: pesca.pescado_cajas,
        precio: pesca.pescado_precio,
      };
    });
  }

  async getPescaByFlotaId(id: number): Promise<Pesca[] | null> {
    const pescas = await PescaModel.findAll({
      include: [
        {
          model: ViajeModel,
          where: { id_flota: id },
        },
      ],
    });
    if (!pescas) {
      return null;
    }
    return pescas.map((pesca) => {
      return {
        id: pesca.id,
        id_viaje: pesca.id_viaje,
        pescado_tipo: pesca.pescado_tipo,
        pescado_cajas: pesca.pescado_cajas,
        precio: pesca.pescado_precio,
      };
    });
  }

  
}
