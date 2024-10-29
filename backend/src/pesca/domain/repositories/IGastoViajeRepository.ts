import { GastosViaje } from "@/pesca/domain";

export class IGastosViajeRepository {
  async getGastosViaje(): Promise<GastosViaje[]> {
    throw new Error("Method not implemented");
  }

  async createGastosViaje(gastosViaje: GastosViaje): Promise<GastosViaje> {
    throw new Error("Method not implemented");
  }

  async updateGastosViaje(
    id: number,
    gastosViaje: GastosViaje
  ): Promise<GastosViaje | null> {
    throw new Error("Method not implemented");
  }

  async deleteGastosViaje(id: number): Promise<GastosViaje | null> {
    throw new Error("Method not implemented");
  }

  async getGastosViajeById(id: number): Promise<GastosViaje | null> {
    throw new Error("Method not implemented");
  }

  async getGastosViajeByViajeId(id: number): Promise<GastosViaje[]> {
    throw new Error("Method not implemented");
  }

  async getGastosViajeByConcepto(concepto: string): Promise<GastosViaje[]> {
    throw new Error("Method not implemented");
  }

  async getGastosViajeByFlotaId(flotaId: number): Promise<GastosViaje[]> {
    throw new Error("Method not implemented");
  }
}
