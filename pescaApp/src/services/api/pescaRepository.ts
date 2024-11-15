import { PescaDTO } from "@/models";

export class PescaRepository {
  private url: string;
  private port: number;
  private host: string;

  constructor(host: string = "localhost", port: number = 3000) {
    this.host = host;
    this.port = port;
    this.url = `http://${this.host}:${this.port}/pesca`;
  }

  public async getPesca(): Promise<Response> {
    const response = await fetch(this.url);
    return response;
  }

  public async getPescaById(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`);
    return response;
  }

  public async createPesca(pesca: PescaDTO): Promise<Response> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pesca),
    });
    return response;
  }

  public async updatePesca(id: number, pesca: PescaDTO): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pesca),
    });
    return response;
  }

  public async deletePesca(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
    return response;
  }

  public async getPescaByViajeId(id: number): Promise<Response> {
    const response = await fetch(`${this.url}/viaje/${id}`);
    return response;
  }
}
