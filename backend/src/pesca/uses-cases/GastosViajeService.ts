import {
  GastosViaje,
  GastosViajeDTO,
  IGastosViajeRepository,
  IViajeRepository,
  IFlotaRepository,
} from "@/pesca/domain";

import { AppError } from "@/shared/errors/AppError";

export class GastosViajeService {
  private readonly repository: IGastosViajeRepository;

  constructor(
    repository: IGastosViajeRepository,
    private viajeRepository: IViajeRepository,
    private flotaRepository: IFlotaRepository
  ) {
    this.repository = repository;
    this.viajeRepository = viajeRepository;
    this.flotaRepository = flotaRepository;
  }
  async getGastosViaje() {
    return await this.repository.getGastosViaje();
  }

  async getGastoViajeById(id: number): Promise<GastosViaje> {
    const gastoViaje = await this.repository.getGastosViajeById(id);
    if (!gastoViaje) {
      throw new AppError("Gasto de viaje no encontrado", 404);
    }
    return gastoViaje;
  }

  async createGastoViaje(gastoViaje: GastosViajeDTO) {
    if (!gastoViaje.concepto) {
      throw new AppError("Concepto de gasto requerido", 400);
    }
    if (!gastoViaje.importe) {
      throw new AppError("Monto de gasto requerido", 400);
    }
    if (gastoViaje.concepto.length > 128) {
      throw new AppError("Concepto de gasto muy largo", 400);
    }
    if (gastoViaje.concepto.length < 3) {
      throw new AppError("Concepto de gasto muy corto", 400);
    }
    if (gastoViaje.importe < 0) {
      throw new AppError("Monto de gasto no puede ser negativo", 400);
    }
    if (!gastoViaje.id_viaje) {
      throw new AppError("Viaje de gasto requerido", 400);
    }
    const gastoviaje = await this.repository.createGastosViaje(gastoViaje);
    return gastoviaje;
  }

  async updateGastoViaje(id: number, gastoViaje: GastosViaje) {
    if (!(await this.getGastoViajeById(id))) {
      throw new AppError("Gasto de viaje no encontrado", 404);
    }
    if (!gastoViaje.concepto && !gastoViaje.importe) {
      throw new AppError("Concepto o monto de gasto requerido", 400);
    }
    if (gastoViaje.concepto && gastoViaje.concepto.length > 128) {
      throw new AppError("Concepto de gasto muy largo", 400);
    }
    if (gastoViaje.concepto && gastoViaje.concepto.length < 3) {
      throw new AppError("Concepto de gasto muy corto", 400);
    }
    if (gastoViaje.importe && gastoViaje.importe < 0) {
      throw new AppError("Monto de gasto no puede ser negativo", 400);
    }
    if (gastoViaje.id_viaje) {
      throw new AppError("No se puede actualizar el viaje de un gasto", 400);
    }
    await this.repository.updateGastosViaje(id, gastoViaje);
  }

  async deleteGastoViaje(id: number) {
    if (!(await this.getGastoViajeById(id))) {
      throw new AppError("Gasto de viaje no encontrado", 404);
    }
    await this.repository.deleteGastosViaje(id);
  }

  async getGastosViajeByViajeId(id: number) {
    if (!(await this.viajeRepository.getViajeById(id))) {
      throw new AppError("Viaje no encontrado", 404);
    }
    return await this.repository.getGastosViajeByViajeId(id);
  }

  async getGastosViajeByConcepto(concepto: string) {
    if (!concepto) {
      throw new AppError("Concepto de gasto requerido", 400);
    }
    return await this.repository.getGastosViajeByConcepto(concepto);
  }

  async getGastosViajeByFlotaId(id: number) {
    if (!(await this.flotaRepository.getFlotaById(id))) {
      throw new AppError("Flota no encontrada", 404);
    }
    return await this.repository.getGastosViajeByFlotaId(id);
  }
}
