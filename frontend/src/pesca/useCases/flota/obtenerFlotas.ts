import { Flota } from "../../domain/Flota";
import { FlotaRepository } from "../../framework/repositories/FlotaRepository";

export class ObtenerFlotas {
  constructor(private flotaRepository: FlotaRepository) {}
  async execute(): Promise<Flota[]> {
    return this.flotaRepository.getAll();
  }
}
