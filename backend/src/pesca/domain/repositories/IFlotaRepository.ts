import { Flota, FlotaDTO } from "@/pesca/domain";

export class IFlotaRepository {
  async getFlotas(): Promise<Flota[]> {
    throw new Error("Method not implemented");
  }
  async getFlotaById(id: number): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }
  async createFlota(flota: FlotaDTO): Promise<Flota> {
    throw new Error("Method not implemented");
  }
  async updateFlota(id: number, flota: FlotaDTO): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }
  async deleteFlota(id: number): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }
  async getFlotasByTitular(titular: string): Promise<Flota[]> {
    throw new Error("Method not implemented");
  }
  async getFlotasByNombre(nombre: string): Promise<Flota[]> {
    throw new Error("Method not implemented");
  }
  async getFlotaByNombreAndTitular(
    nombre: string,
    titular: string
  ): Promise<Flota | null> {
    throw new Error("Method not implemented");
  }
}
