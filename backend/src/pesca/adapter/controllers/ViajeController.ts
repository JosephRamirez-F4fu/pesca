import { Viaje } from "@/pesca/domain";
import { ViajeService } from "@/pesca/uses-cases";
export class ViajeController {
  private viajeService: ViajeService;

  constructor(viajeService: ViajeService) {
    this.viajeService = viajeService;
  }

  async createViaje(viaje: Viaje) {
    return this.viajeService.createViaje(viaje);
  }

  async getViajes() {
    return this.viajeService.getViajes();
  }

  async getViajeById(id: number) {
    return this.viajeService.getViajeById(id);
  }

  async updateViaje(id: number, viaje: Viaje) {
    return this.viajeService.updateViaje(id, viaje);
  }

  async deleteViaje(id: number) {
    return this.viajeService.deleteViaje(id);
  }

  async getViajesByFlotaId(id: number) {
    return this.viajeService.getViajesByFlotaId(id);
  }
}
