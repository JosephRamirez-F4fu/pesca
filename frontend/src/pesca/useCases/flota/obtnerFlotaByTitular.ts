import { FlotaRepository } from "../../framework/repositories/FlotaRepository";
import { Flota } from "../../domain/model";
export class ObtenerFlotaByTitular {
    private flotaRepository: FlotaRepository;
    constructor() {
        this.flotaRepository = new FlotaRepository();
    }
    
    async execute(titular:string): Promise<Flota[]> {
        return await this.flotaRepository.getByTitular(titular);
    }
}