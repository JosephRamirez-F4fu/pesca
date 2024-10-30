import { Viaje, ViajeDTO } from "@/pesca/domain";
export class IViajeRepository {
  async getViajes(): Promise<Viaje[]> {
    throw new Error("Method not implemented");
  }
  async getViajeById(id: number): Promise<Viaje | null> {
    throw new Error("Method not implemented");
  }
  async createViaje(viaje: ViajeDTO): Promise<Viaje> {
    throw new Error("Method not implemented");
  }
  async updateViaje(id: number, viaje: ViajeDTO): Promise<Viaje | null> {
    throw new Error("Method not implemented");
  }
  async deleteViaje(id: number): Promise<Viaje | null> {
    throw new Error("Method not implemented");
  }
  async getViajesByFlotaId(flotaId: number): Promise<Viaje[]> {
    throw new Error("Method not implemented");
  }
}
