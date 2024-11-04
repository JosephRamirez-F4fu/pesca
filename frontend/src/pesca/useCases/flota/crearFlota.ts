import { FlotaDTO,Flota} from "@/pesca/domain/model";
import { FlotaRepository } from "@/pesca/framework/repositories/FlotaRepository";
export class CrearFlota {
    private flotaRepository: FlotaRepository;
    constructor() {
        this.flotaRepository = new FlotaRepository();
    }
    
    async execute(flota: FlotaDTO): Promise<Flota> {
        const newFlota = await this.flotaRepository.save(flota);
        return newFlota;
    }
}