import { Flota } from "../../domain/Flota";

export class FlotaRepository {
  async getAll(): Promise<Flota[]> {
    const response = await fetch("http://localhost:8080/flota");
    const flotas = await response.json();
    return flotas;
  }
}
