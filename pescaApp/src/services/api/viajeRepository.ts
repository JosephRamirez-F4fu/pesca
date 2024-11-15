import { ViajeDTO } from "@/models";
export class ViajeRepository {
  private url: string;
  private port: number;

  constructor(host: string = "localhost", port: number = 3000) {
    this.port = port;
    this.url = `http://${host}:${this.port}/viaje`;
  }

  public async getViajes(): Promise<Response> {
    const response = await fetch(this.url);
    return response;
  }

  public async getViaje(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`);
    return response;
  }

  public async createViaje(viaje: ViajeDTO): Promise<Response> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(viaje),
    });
    return response;
  }

  public async updateViaje(id: number, viaje: ViajeDTO): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(viaje),
    });
    return response;
  }

  public async deleteViaje(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
    return response;
  }

  public async getViajesByFlotaId(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/flota/${id}`);
    return response;
  }

  public async getViajesSummary(): Promise<Response> {
    const response = await fetch(`${this.url}/summary`);
    return response;
  }
}
