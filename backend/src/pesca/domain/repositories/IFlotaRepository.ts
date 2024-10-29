import { Flota } from "../model";

export class IFlotaRepository {
  async getFlotas(): Promise<Flota[]> {
    throw new Error("Method not implemented");
  }
  async getFlotaById(id: number): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }
  async createFlota(flota: Flota): Promise<Flota> {
    throw new Error("Method not implemented");
  }
  async updateFlota(id: number, flota: Flota): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }
  async deleteFlota(id: number): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }

  async getFlotasByTitular(titular: string): Promise<Flota[]> {
    throw new Error("Method not implemented");
  }
  async getFlotaByNombre(nombre: string): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }
}
