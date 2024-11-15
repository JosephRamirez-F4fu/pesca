import { Viaje, ViajeDTO, ViajeSummary, HandlerResponse } from "@/models";
import { ViajeRepository } from "@/services/api";

export class ViajeService {
  private viajeRepository: ViajeRepository;
  constructor() {
    this.viajeRepository = new ViajeRepository();
  }

  public async getViajes() {
    const response = await this.viajeRepository.getViajes();
    if (response.status === 200) {
      const viajes: Viaje[] = await response.json();
      return viajes;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async getViaje(id: number) {
    const response = await this.viajeRepository.getViaje(id);
    if (response.status === 200) {
      const viaje: Viaje = await response.json();
      return viaje;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async createViaje(viaje: ViajeDTO) {
    const response = await this.viajeRepository.createViaje(viaje);
    if (response.status === 200) {
      const viaje: Viaje = await response.json();
      return viaje;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async updateViaje(id: number, viaje: ViajeDTO) {
    const response = await this.viajeRepository.updateViaje(id, viaje);
    if (response.status === 200) {
      const viaje: Viaje = await response.json();
      return viaje;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async deleteViaje(id: number) {
    const response = await this.viajeRepository.deleteViaje(id);
    if (response.status === 200) {
      const viaje: Viaje = await response.json();
      return viaje;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async getViajesByFlotaId(id: number) {
    const response = await this.viajeRepository.getViajesByFlotaId(id);
    if (response.status === 200) {
      const viajes: Viaje[] = await response.json();
      return viajes;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }

  public async getViajesSummary() {
    const response = await this.viajeRepository.getViajesSummary();
    if (response.status === 200) {
      const summary: ViajeSummary[] = await response.json();
      return summary;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
}
