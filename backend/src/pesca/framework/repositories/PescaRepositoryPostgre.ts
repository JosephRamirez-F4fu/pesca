import { Pesca, IPescaRepository } from "@/pesca/domain";
import { PescaModel } from "@/pesca/framework/orm/models";

export class PescaRepositoryPostgre implements IPescaRepository {
  async getPescas(): Promise<Pesca[]> {
    const pescas = await PescaModel.findAll();
    return pescas.map((pesca) => {
      return {
        id: pesca.id,
      };
    });
  }
}
