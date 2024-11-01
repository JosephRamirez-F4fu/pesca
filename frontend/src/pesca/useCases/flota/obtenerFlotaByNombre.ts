import { Flota } from "../../domain/model"
import { FlotaRepository } from "../../framework/repositories/FlotaRepository";

export class ObtenerFlotaByNombre {
    private flotaRepository: FlotaRepository;
    constructor() {
        this.flotaRepository = new FlotaRepository();
    }
    
    async execute(nombre:string): Promise<Flota[]> {
        return await this.flotaRepository.getByNombre(nombre);
    }
}