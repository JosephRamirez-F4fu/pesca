import { Pesca, IPescaRepository, PescaDTO } from "@/pesca/domain";
import { PescaModel, ViajeModel } from "@/pesca/framework/orm/models";
import { PescaMapper } from "@/pesca/domain/mapper/PescaMapper";

export class PescaRepositoryPostgre implements IPescaRepository {
  async getPescas(): Promise<Pesca[]> {
    const pescas = await PescaModel.findAll();
    return pescas.map((pesca) => {
      return PescaMapper.toDomain(pesca);
    });
  }
  async createPesca(pesca: PescaDTO): Promise<Pesca> {
    console.log(PescaMapper.toPersistence(pesca));
    const pescaCreated = await PescaModel.create(
      PescaMapper.toPersistence(pesca)
    );
    return PescaMapper.toDomain(pescaCreated);
  }

  async updatePesca(id: number, pesca: PescaDTO): Promise<Pesca | null> {
    const pescaToUpdate = await PescaModel.findByPk(id);
    if (!pescaToUpdate) {
      return null;
    }
    PescaMapper.SetterToPersistance(pescaToUpdate, pesca);
    const pescaUpdated = await pescaToUpdate.save();
    return PescaMapper.toDomain(pescaUpdated);
  }

  async deletePesca(id: number): Promise<Pesca | null> {
    const pescaToDelete = await PescaModel.findByPk(id);
    if (!pescaToDelete) {
      return null;
    }
    await pescaToDelete.destroy();
    return PescaMapper.toDomain(pescaToDelete);
  }

  async getPescaById(id: number): Promise<Pesca | null> {
    const pesca = await PescaModel.findByPk(id);
    if (!pesca) {
      return null;
    }
    return PescaMapper.toDomain(pesca);
  }

  async getPescaByViajeId(id: number): Promise<Pesca[] | null> {
    const pescas = await PescaModel.findAll({ where: { id_viaje: id } });
    if (!pescas) {
      return null;
    }
    return pescas.map((pesca) => {
      return PescaMapper.toDomain(pesca);
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
      return PescaMapper.toDomain(pesca);
    });
  }
}
