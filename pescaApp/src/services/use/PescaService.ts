import { Pesca, PescaDTO, HandlerResponse } from "@/models";
import { PescaRepository } from "@/services/api";

export class PescaService {
  private pescaRepository: PescaRepository;
  constructor() {
    this.pescaRepository = new PescaRepository();
  }

  public async getPescas() {
    const response = await this.pescaRepository.getPesca();
    if (response.status === 200) {
      const pescas: Pesca[] = await response.json();
      return pescas;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async getPesca(id: number) {
    const response = await this.pescaRepository.getPescaById(id);
    if (response.status === 200) {
      const pesca: Pesca = await response.json();
      return pesca;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async createPesca(pesca: PescaDTO) {
    const response = await this.pescaRepository.createPesca(pesca);
    if (response.status === 201) {
      const pesca: Pesca = await response.json();
      return pesca;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async updatePesca(id: number, pesca: PescaDTO) {
    const response = await this.pescaRepository.updatePesca(id, pesca);
    if (response.status === 200) {
      const pesca: Pesca = await response.json();
      return pesca;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async deletePesca(id: number) {
    const response = await this.pescaRepository.deletePesca(id);
    if (response.status === 200) {
      const pesca: Pesca = await response.json();
      return pesca;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async getPescasByViajeId(id: number) {
    const response = await this.pescaRepository.getPescaByViajeId(id);
    if (response.status === 200) {
      const pescas: Pesca[] = await response.json();
      return pescas;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
}
