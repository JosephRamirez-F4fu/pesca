import { FlotaRepositoryInterface,Flota } from "../../domain";
import FlotaModel from "../orm/models";
export class FlotaRepositoryPostgre implements FlotaRepositoryInterface {
    async getFlotas(): Promise<Flota[]> {
       const flotas = await FlotaModel.findAll();
       return flotas.map((flota) => {
              return {
                id: flota.id,
                nombre: flota.nombre,
                titular: flota.titular
       }} );
    }
    async getFlotaById(id: number): Promise<Flota> {
        throw new Error("Method not implemented");
    }
    async createFlota(flota: Flota): Promise<Flota> {
        throw new Error("Method not implemented");
    }
    async updateFlota(id: number, flota: Flota): Promise<Flota> {
        throw new Error("Method not implemented");
    }
    async deleteFlota(id: number): Promise<Flota> {
        throw new Error("Method not implemented");
    }
}