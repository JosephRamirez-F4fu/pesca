import { FlotaRepository } from "../../framework/repositories/FlotaRepository";

export class EliminarFlota {
    private flotaRepository: FlotaRepository;
    constructor() {
        this.flotaRepository = new FlotaRepository();
    }
    
    async execute(id:number): Promise<void> {
        await this.flotaRepository.delete(id);
    }
}