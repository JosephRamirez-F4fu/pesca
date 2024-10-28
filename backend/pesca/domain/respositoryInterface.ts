import { Flota } from "../domain";

export class FlotaRepositoryInterface {
  async getFlotas(): Promise<Flota[]> {
    throw new Error("Method not implemented");
  }
  async getFlotaById(id: number): Promise<Flota|null> {
    throw new Error("Method not implemented");
  }
  async createFlota(flota: Flota): Promise<Flota> {
    throw new Error("Method not implemented");
  }
  async updateFlota(id: number, flota: Flota): Promise<Flota|null> {
    throw new Error("Method not implemented");
  }
  async deleteFlota(id: number): Promise<Flota|null> {
    throw new Error("Method not implemented");
  }
}
