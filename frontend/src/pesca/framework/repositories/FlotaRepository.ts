import { Flota, FlotaDTO } from "@/pesca/domain/model";

export class FlotaRepository {
  async getAll(): Promise<Flota[]> {
    const response = await fetch("http://localhost:8080/flota");
    const flotas = await response.json();
    return flotas;
  }
  async getById(id: number): Promise<Flota> {
    const response = await fetch(`http://localhost:8080/flota/${id}`);
    const flota: Flota = await response.json();
    
    return flota;
  }
  async save(flota: FlotaDTO): Promise<Flota> {
    try {
      const response = await fetch("http://localhost:8080/flota", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flota),
    });
    const flotaSaved:Flota = await response.json();
    return flotaSaved;
  }
    catch (error) {
      console.log(error);
      throw new Error("Error al guardar la flota");
    }
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
