import { FlotaRepository } from "@/services/api";
import { Flota, FlotaDTO, HandlerResponse } from "@/models";

export class FlotaService {
  private flotaRepository: FlotaRepository;

  constructor() {
    this.flotaRepository = new FlotaRepository();
  }

  public async getFlotas() {
    const response = await this.flotaRepository.getFlotas();
    if (response.status === 200) {
      const flotas: Flota[] = await response.json();
      return flotas;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async createFlota(flota: FlotaDTO) {
    const response = await this.flotaRepository.createFlota(flota);
    if (response.status === 201) {
      const flota: Flota = await response.json();
      return flota;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async updateFlota(id: number, flota: FlotaDTO) {
    const response = await this.flotaRepository.updateFlota(id, flota);
    if (response.status === 200) {
      const flota: Flota = await response.json();
      return flota;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async deleteFlota(id: number) {
    const response = await this.flotaRepository.deleteFlota(id);
    if (response.status === 200) {
      const flota: Flota = await response.json();
      return flota;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
}
