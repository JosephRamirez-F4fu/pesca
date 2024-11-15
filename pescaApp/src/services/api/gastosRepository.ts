import { GastosViajeDTO } from "@/models";

export class GastosRepository {
  private url: string;
  private host: string;
  private port: number;

  constructor(host: string = "localhost", port: number = 3000) {
    this.host = host;
    this.port = port;
    this.url = `http://${this.host}:${this.port}/gastosviaje`;
  }

  public async getGastosViaje(): Promise<Response> {
    const response = await fetch(this.url);
    return response;
  }

  public async getGastoViaje(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`);
    return response;
  }

  public async createGastoViaje(gasto: GastosViajeDTO): Promise<Response> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gasto),
    });
    return response;
  }

  public async updateGastoViaje(
    id: number,
    gasto: GastosViajeDTO
  ): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gasto),
    });
    return response;
  }

  public async deleteGastoViaje(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
    return response;
  }

  public async getGastosViajeByViajeId(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/viaje/${id}`);
    return response;
  }
}
