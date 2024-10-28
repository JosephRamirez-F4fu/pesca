import { Request, Response } from 'express';
import { FlotaService } from '../uses-cases';
import { FlotaRepositoryInterface } from '../domain';
import { FlotaRepositoryPostgre } from '../framework/repositories/FlotaRepositoryPostgre';

export class FlotaController {
    private flotaservice: FlotaService;
    private flotaRepository : FlotaRepositoryInterface;
    constructor() {
        this.flotaRepository  = new FlotaRepositoryPostgre();
        this.flotaservice = new FlotaService(this.flotaRepository);
    }
    crearFlota(req: Request, res: Response) {
        res.json({message: 'Flota creada'});
    }
    obtenerFlota(req: Request, res: Response) {
        res.json({message: 'Obtener flota'});
    }
    editarFlota(req: Request, res: Response) {
        res.json({message: 'Editar flota'});
    }
    eliminarFlota(req: Request, res: Response) {
        res.json({message: 'Eliminar flota'});
    }

}