import { Pesca } from "@/pesca/domain";
import { PescaService } from "@/pesca/uses-cases";
export class PescaControler {
  private pescaService: PescaService;

  constructor(pescaService: PescaService) {
    this.pescaService = pescaService;
  }

  async createPesca(pesca: Pesca) {
    return this.pescaService.createPesca(pesca);
  }

  async getPesca() {
    return this.pescaService.getPescas();
  }

  async getPescaById(id: number) {
    return this.pescaService.getPescaById(id);
  }

  async updatePesca(id: number, pesca: Pesca) {
    return this.pescaService.updatePesca(id, pesca);
  }

  async deletePesca(id: number) {
    return this.pescaService.deletePesca(id);
  }

  async getPescaByViajeId(id: number) {
    return this.pescaService.getPescaByViajeId(id);
  }
}
