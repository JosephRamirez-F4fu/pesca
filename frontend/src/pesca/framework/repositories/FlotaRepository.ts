import { Flota, FlotaDTO } from "../../domain/model";

export class FlotaRepository {
  async getAll(): Promise<Flota[]> {
    const response = await fetch("http://localhost:8080/flota");
    const flotas = await response.json();
    return flotas;
  }
  async getById(id: number): Promise<Flota> {
    const response = await fetch(`http://localhost:8080/flota/${id}`);
    const flota = await response.json();
    return flota;
  }
  async save(flota: Flota): Promise<Flota> {
    const response = await fetch("http://localhost:8080/flota", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flota),
    });
    const flotaSaved = await response.json();
    return flotaSaved;
  }
  async update (id: number, flota: FlotaDTO): Promise<void> {
    await fetch(`http://localhost:8080/flota/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flota),  
    });
  }
  async delete(id: number): Promise<void> {
    await fetch(`http://localhost:8080/flota/${id}`, {
      method: "DELETE",
    });
  }
  async getByTitular(titular: string): Promise<Flota[]> {
    const response = await fetch("http://localhost:8080/flota/titular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        titular
      ),
    });
    const flotas = await response.json();
    return flotas;
  }
  async getByNombre(nombre: string): Promise<Flota[]> {
    const response = await fetch("http://localhost:8080/flota/nombre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        nombre
      ),
    });
    const flotas = await response.json();
    return flotas;
  }
}
