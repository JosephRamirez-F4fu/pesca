import { IViajeRepository, IFlotaRepository, ViajeDTO } from "@/pesca/domain";
import { AppError } from "@/shared/errors/AppError";

export class ViajeService {
  private readonly repository: IViajeRepository;
  private readonly flotaRepository: IFlotaRepository;

  constructor(repository: IViajeRepository, flotaRepository: IFlotaRepository) {
    this.repository = repository;
    this.flotaRepository = flotaRepository;
  }
  // TODO VIAJE SERVICE VALIDATIONS AND BUSINESS LOGIC
  async getViajes() {
    return await this.repository.getViajes();
  }

  async getViajeById(id: number) {
    const viaje = await this.repository.getViajeById(id);
    if (!viaje) {
      throw new AppError("Viaje no encontrado", 404);
    }
    return viaje;
  }

  async createViaje(viaje: ViajeDTO) {
    if (!viaje.flota_id) {
      throw new AppError("Flota de viaje requerida", 400);
    }
    if (!viaje.petroleo_cargado) {
      throw new AppError("Petroleo cargado requerido", 400);
    }
    if (!viaje.petroleo_consumido) {
      throw new AppError("Petroleo Consumido requerido", 400);
    }
    if (!viaje.petroleo_restante) {
      throw new AppError("Petroleo Restante requerido", 400);
    }
    if (!(await this.flotaRepository.getFlotaById(viaje.flota_id))) {
      throw new AppError("Flota no encontrada", 404);
    }
    const viajeCreated = await this.repository.createViaje(viaje);
    return viajeCreated;
  }

  async updateViaje(id: number, viaje: ViajeDTO) {
    if (!(await this.getViajeById(id))) {
      throw new AppError("Viaje no encontrado", 404);
    }
    if (
      !viaje.flota_id &&
      !viaje.petroleo_cargado &&
      !viaje.petroleo_consumido &&
      !viaje.petroleo_restante
    ) {
      throw new AppError("Datos de viaje requeridos", 400);
    }
    if (!(await this.flotaRepository.getFlotaById(viaje.flota_id))) {
      throw new AppError("Flota no encontrada", 404);
    }
    await this.repository.updateViaje(id, viaje);
  }

  async deleteViaje(id: number) {
    if (!(await this.getViajeById(id))) {
      throw new AppError("Viaje no encontrado", 404);
    }
    await this.repository.deleteViaje(id);
  }

  async getViajesByFlotaId(flotaId: number) {
    if (!(await this.flotaRepository.getFlotaById(flotaId))) {
      throw new AppError("Flota no encontrada", 404);
    }
    return await this.repository.getViajesByFlotaId(flotaId);
  }
}
