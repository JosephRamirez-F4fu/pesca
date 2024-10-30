import { GastosViaje, IGastosViajeRepository } from "@/pesca/domain";
import { GastosViajeService } from "@/pesca/uses-cases";
import { GastoViajeRepositoryPostgre } from "@/pesca/framework/repositories";
export class GastosViajeController {
  private gastosViajeService: GastosViajeService;
  private GastosViajeRepository: IGastosViajeRepository;
  constructor() {
    this.GastosViajeRepository = new GastoViajeRepositoryPostgre();
    this.gastosViajeService = new GastosViajeService(
      this.GastosViajeRepository
    );
  }

  async createGastosViaje(gastosViaje: GastosViaje) {
    return this.gastosViajeService.createGastoViaje(gastosViaje);
  }

  async getGastosViaje() {
    return this.gastosViajeService.getGastosViaje();
  }

  async getGastosViajeById(id: number) {
    return this.gastosViajeService.getGastoViajeById(id);
  }

  async updateGastosViaje(id: number, gastosViaje: GastosViaje) {
    return this.gastosViajeService.updateGastoViaje(id, gastosViaje);
  }

  async deleteGastosViaje(id: number) {
    return this.gastosViajeService.deleteGastoViaje(id);
  }

  async getGastosViajeByViajeId(id: number) {
    return this.gastosViajeService.getGastosViajeByViajeId(id);
  }

  async getGastosViajeByConcepto(concepto: string) {
    return this.gastosViajeService.getGastosViajeByConcepto(concepto);
  }

  async getGastosViajeByFlotaId(importe: number) {
    return this.gastosViajeService.getGastosViajeByFlotaId(importe);
  }
}
