import { FlotaDTO } from "@/models";
export class FlotaRepository {
  private url: string;
  private port: number;
  private host: string;

  constructor(host: string = "localhost", port: number = 3000) {
    this.host = host;
    this.port = port;
    this.url = `http://${this.host}:${this.port}/flota`;
  }

  public async getFlotas(): Promise<Response> {
    const response = await fetch(this.url);
    return response;
  }
  public async getFlota(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`);

    return response;
  }
  public async createFlota(flota: FlotaDTO): Promise<Response> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flota),
    });
    return response;
  }

  public async updateFlota(id: number, flota: FlotaDTO): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flota),
    });
    return response;
  }

  public async deleteFlota(id: number): Promise<Response> {
    const reponse = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
    return reponse;
  }
}
