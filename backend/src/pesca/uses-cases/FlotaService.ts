import { FlotaDTO, Flota, IFlotaRepository } from "@/pesca/domain";
import { AppError } from "@/shared/errors/AppError";
export class FlotaService {
  private readonly repository: IFlotaRepository;

  constructor(repository: IFlotaRepository) {
    this.repository = repository;
  }

  async getFlotas() {
    return this.repository.getFlotas();
  }

  async getFlotaById(id: number): Promise<Flota> {
    const flota = await this.repository.getFlotaById(id);
    if (!flota) {
      throw new AppError("Flota no encontrada", 404);
    }
    return flota;
  }

  async createFlota(flota: FlotaDTO) {
    if (!flota.nombre) {
      throw new AppError("Nombre de flota requerido", 400);
    }
    if (!flota.titular) {
      throw new AppError("Titular de flota requerido", 400);
    }
    if (flota.nombre.length > 128) {
      throw new AppError("Nombre de flota muy largo", 400);
    }
    if (flota.titular.length > 128) {
      throw new AppError("Titular de flota muy largo", 400);
    }
    if (flota.nombre.length < 3) {
      throw new AppError("Nombre de flota muy corto", 400);
    }
    if (flota.titular.length < 3) {
      throw new AppError("Titular de flota muy corto", 400);
    }
    const flotaExistente = await this.repository.getFlotaByNombreAndTitular(
      flota.nombre,
      flota.titular
    );
    if (flotaExistente) {
      throw new AppError("Flota ya registrada", 400);
    }
    return this.repository.createFlota(flota);
  }

  async updateFlota(id: number, flota: FlotaDTO) {
    if (!(await this.getFlotaById(id))) {
      throw new AppError("Flota no encontrada", 404);
    }
    if (!flota.nombre && !flota.titular) {
      throw new AppError("Nombre o titular de flota requerido", 400);
    }
    this.repository.updateFlota(id, flota);
  }

  async deleteFlota(id: number) {
    if (!(await this.getFlotaById(id))) {
      throw new AppError("Flota no encontrada", 404);
    }
    this.repository.deleteFlota(id);
  }

  async getFlotasByTitular(titular: string) {
    if (!titular) {
      throw new AppError("Titular de flota requerido", 400);
    }
    if (titular.length > 128) {
      throw new AppError("Titular de flota muy largo", 400);
    }
    if (titular.length < 3) {
      throw new AppError("Titular de flota muy corto", 400);
    }

    const flotas = await this.repository.getFlotasByTitular(titular);

    if (!flotas) {
      throw new AppError("Flotas no encontradas", 404);
    }

    return this.repository.getFlotasByTitular(titular);
  }

  async getFlotasByNombre(nombre: string) {
    if (!nombre) {
      throw new AppError("Nombre de flota requerido", 400);
    }
    if (nombre.length > 128) {
      throw new AppError("Nombre de flota muy largo", 400);
    }
    if (nombre.length < 3) {
      throw new AppError("Nombre de flota muy corto", 400);
    }
    const flota = await this.repository.getFlotasByNombre(nombre);
    if (!flota) {
      throw new AppError("Flota no encontrada", 404);
    }
    return flota;
  }
}
