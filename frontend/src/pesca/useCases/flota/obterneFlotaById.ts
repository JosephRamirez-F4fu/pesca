import { Flota } from "../../domain/model"
import { FlotaRepository } from "../../framework/repositories/FlotaRepository";
export class ObterneFlotaById {
    private flotaRepository: FlotaRepository;
    constructor() {
        this.flotaRepository = new FlotaRepository();
    }
    
    async execute(id:number): Promise<Flota> {
        return await this.flotaRepository.getById(id);
    }
}