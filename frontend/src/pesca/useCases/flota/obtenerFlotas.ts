import { Flota } from "@/pesca/domain/model";
import { FlotaRepository } from "../../framework/repositories/FlotaRepository";

export class ObtenerFlotas {
  private flotaRepository: FlotaRepository
  constructor() {
    this.flotaRepository = new FlotaRepository();
  }
  async execute(): Promise<Flota[]> {
    return this.flotaRepository.getAll();
  }
}
