import { Viaje, IViajeRepository } from "@/pesca/domain";

export class ViajeService {
  constructor(private repository: IViajeRepository) {}

  async getViajes() {
    return this.repository.getViajes();
  }

  async getViajeById(id: number) {
    return this.repository.getViajeById(id);
  }

  async createViaje(viaje: Viaje) {
    return this.repository.createViaje(viaje);
  }

  async updateViaje(id: number, viaje: Viaje) {
    this.repository.updateViaje(id, viaje);
  }

  async deleteViaje(id: number) {
    this.repository.deleteViaje(id);
  }

  async getViajesByFlotaId(flotaId: number) {
    return this.repository.getViajesByFlotaId(flotaId);
  }
}
