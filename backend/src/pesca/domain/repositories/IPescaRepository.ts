import { Pesca, PescaDTO } from "@/pesca/domain";
export class IPescaRepository {
  async getPescas(): Promise<Pesca[]> {
    throw new Error("Method not implemented");
  }
  async createPesca(pesca: PescaDTO): Promise<Pesca> {
    throw new Error("Method not implemented");
  }
  async updatePesca(id: number, pesca: PescaDTO): Promise<Pesca | null> {
    throw new Error("Method not implemented");
  }
  async deletePesca(id: number): Promise<Pesca | null> {
    throw new Error("Method not implemented");
  }
  async getPescaById(id: number): Promise<Pesca | null> {
    throw new Error("Method not implemented");
  }
  async getPescaByViajeId(id: number): Promise<Pesca[] | null> {
    throw new Error("Method not implemented");
  }
  async getPescaByFlotaId(id: number): Promise<Pesca[] | null> {
    throw new Error("Method not implemented");
  }
}
