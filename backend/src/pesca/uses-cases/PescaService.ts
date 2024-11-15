import {
  IPescaRepository,
  IFlotaRepository,
  IViajeRepository,
  PescaDTO,
  Pesca,
} from "@/pesca/domain";
import { AppError } from "@/shared/errors/AppError";

export class PescaService {
  private readonly repository: IPescaRepository;
  private readonly flotaRepository: IFlotaRepository;
  private readonly viajeRepository: IViajeRepository;
  constructor(
    repository: IPescaRepository,
    flotaRepository: IFlotaRepository,
    viajeRepository: IViajeRepository
  ) {
    this.repository = repository;
    this.flotaRepository = flotaRepository;
    this.viajeRepository = viajeRepository;
  }

  async getPescas() {
    return await this.repository.getPescas();
  }

  async getPescaById(id: number): Promise<Pesca> {
    const pesca = await this.repository.getPescaById(id);
    if (!pesca) {
      throw new AppError("Pesca no encontrada", 404);
    }
    return pesca;
  }

  async createPesca(pesca: PescaDTO) {
    if (!pesca.id_viaje) {
      throw new AppError("Viaje de pesca requerido", 400);
    }
    if (!pesca.pescado_tipo) {
      throw new AppError("Tipo de pescado requerido", 400);
    }
    if (!pesca.pescado_cajas) {
      throw new AppError("Cajas de pescado requeridas", 400);
    }
    if (!pesca.precio) {
      throw new AppError("Precio de pescado requerido", 400);
    }
    if (pesca.precio <= 0) {
      throw new AppError("Precio de pescado debe ser mayor a 0", 400);
    }

    if (!(await this.viajeRepository.getViajeById(pesca.id_viaje))) {
      throw new AppError("Viaje no encontrado", 404);
    }
    return await this.repository.createPesca(pesca);
  }

  async updatePesca(id: number, pesca: PescaDTO) {
    if (!(await this.getPescaById(id))) {
      throw new AppError("Pesca no encontrada", 404);
    }
    if (!pesca.id_viaje && !pesca.pescado_tipo && !pesca.pescado_cajas) {
      throw new AppError("Datos de pesca requeridos", 400);
    }
    return await this.repository.updatePesca(id, pesca);
  }

  async deletePesca(id: number) {
    if (!(await this.getPescaById(id))) {
      throw new AppError("Pesca no encontrada", 404);
    }
    return await this.repository.deletePesca(id);
  }

  async getPescaByViajeId(id: number) {
    if (!id) {
      throw new AppError("Id de viaje requerido", 400);
    }
    if (!(await this.viajeRepository.getViajeById(id))) {
      throw new AppError("Viaje no encontrado", 404);
    }
    return await this.repository.getPescaByViajeId(id);
  }

  async getPescaByFlotaId(id: number) {
    if (!id) {
      throw new AppError("Id de flota requerido", 400);
    }
    if (!(await this.flotaRepository.getFlotaById(id))) {
      throw new AppError("Flota no encontrada", 404);
    }
    return await this.repository.getPescaByFlotaId(id);
  }
}
