import { GastosViaje, GastosViajeDTO, HandlerResponse } from "@/models";
import { GastosRepository } from "@/services/api";

export class GastosService {
  private gastosRepository: GastosRepository;
  constructor() {
    this.gastosRepository = new GastosRepository();
  }
  public async getGastosViaje() {
    const response = await this.gastosRepository.getGastosViaje();
    if (response.status === 200) {
      const gastos: GastosViaje[] = await response.json();
      return gastos;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
  public async getGastoViaje(id: number) {
    const response = await this.gastosRepository.getGastoViaje(id);
    if (response.status === 200) {
      const gasto: GastosViaje = await response.json();
      return gasto;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
  public async createGastoViaje(gasto: GastosViajeDTO) {
    const response = await this.gastosRepository.createGastoViaje(gasto);
    if (response.status === 201) {
      const gasto: GastosViaje = await response.json();
      return gasto;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
  public async updateGastoViaje(id: number, gasto: GastosViajeDTO) {
    const response = await this.gastosRepository.updateGastoViaje(id, gasto);
    if (response.status === 200) {
      const gasto: GastosViaje = await response.json();
      return gasto;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
  public async deleteGastoViaje(id: number) {
    const response = await this.gastosRepository.deleteGastoViaje(id);
    if (response.status === 200) {
      const gasto: GastosViaje = await response.json();
      return gasto;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
  public async getGastosViajeByViajeId(id: number) {
    const response = await this.gastosRepository.getGastosViajeByViajeId(id);
    if (response.status === 200) {
      const gastos: GastosViaje[] = await response.json();
      return gastos;
    }
    const errorRes: HandlerResponse = await response.json();
    return errorRes;
  }
}
