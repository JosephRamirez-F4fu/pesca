import { Flota, IFlotaRepository } from "@/pesca/domain";
export class FlotaService {
  private readonly repository: IFlotaRepository;

  constructor(repository: IFlotaRepository) {
    this.repository = repository;
  }

  async getFlotas() {
    return this.repository.getFlotas();
  }

  async getFlotaById(id: number) {
    return this.repository.getFlotaById(id);
  }

  async createFlota(flota: Flota) {
    return this.repository.createFlota(flota);
  }

  async updateFlota(id: number, flota: Flota) {
    this.repository.updateFlota(id, flota);
  }

  async deleteFlota(id: number) {
    this.repository.deleteFlota(id);
  }

  async getFlotasByTitular(titular: string) {
    return this.repository.getFlotasByTitular(titular);
  }

  async getFlotaByNombre(nombre: string) {
    return this.repository.getFlotaByNombre(nombre);
  }
}
