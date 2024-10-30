import { GastosViaje, GastosViajeDTO, IGastosViajeRepository } from "@/pesca/domain";

export class GastosViajeService {
  private readonly repository: IGastosViajeRepository;

  constructor(repository: IGastosViajeRepository) {
    this.repository = repository;
  }

  async getGastosViaje() {
    return this.repository.getGastosViaje();
  }

  async getGastoViajeById(id: number) {
    return this.repository.getGastosViajeById(id);
  }

  async createGastoViaje(gastoViaje: GastosViajeDTO) {
    return this.repository.createGastosViaje(gastoViaje);
  }

  async updateGastoViaje(id: number, gastoViaje: GastosViaje) {
    this.repository.updateGastosViaje(id, gastoViaje);
  }

  async deleteGastoViaje(id: number) {
    this.repository.deleteGastosViaje(id);
  }

  async getGastosViajeByViajeId(id: number) {
    return this.repository.getGastosViajeByViajeId(id);
  }

  async getGastosViajeByConcepto(concepto: string) {
    return this.repository.getGastosViajeByConcepto(concepto);
  }

  async getGastosViajeByFlotaId(id: number) {
    return this.repository.getGastosViajeByFlotaId(id);
  }
}
