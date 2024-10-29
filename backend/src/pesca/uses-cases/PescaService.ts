import { Pesca, IPescaRepository } from "@/pesca/domain";

export class PescaService {
  private readonly repository: IPescaRepository;

  constructor(repository: IPescaRepository) {
    this.repository = repository;
  }

  async getPescas() {
    return this.repository.getPescas();
  }

  async getPescaById(id: number) {
    return this.repository.getPescaById(id);
  }

  async createPesca(pesca: Pesca) {
    return this.repository.createPesca(pesca);
  }

  async updatePesca(id: number, pesca: Pesca) {
    this.repository.updatePesca(id, pesca);
  }

  async deletePesca(id: number) {
    this.repository.deletePesca(id);
  }

  async getPescaByViajeId(id: number) {
    return this.repository.getPescaByViajeId(id);
  }

  async getPescaByFlotaId(id: number) {
    return this.repository.getPescaByFlotaId(id);
  }
}