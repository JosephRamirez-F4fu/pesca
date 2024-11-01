import { FlotaDTO } from "../../domain/model";
import { FlotaRepository } from "../../framework/repositories/FlotaRepository";
export class EditarFlota {
    private flotaRepository: FlotaRepository;
    constructor() {
        this.flotaRepository = new FlotaRepository();
    }
    
    async execute(id:number,flota: FlotaDTO): Promise<void> {
        await this.flotaRepository.update(id, flota);
    }
}