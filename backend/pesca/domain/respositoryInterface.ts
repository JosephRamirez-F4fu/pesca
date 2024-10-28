import { Flota } from "../domain";

export class FlotaRepositoryInterface {
  async getFlotas(): Promise<Flota[]> {
    throw new Error("Method not implemented");
  }
  async getFlotaById(id: string): Promise<Flota> {
    throw new Error("Method not implemented");
  }
  async createFlota(flota: Flota): Promise<Flota> {
    throw new Error("Method not implemented");
  }
  async updateFlota(id: string, flota: Flota): Promise<Flota> {
    throw new Error("Method not implemented");
  }
  async deleteFlota(id: string): Promise<Flota> {
    throw new Error("Method not implemented");
  }
}
