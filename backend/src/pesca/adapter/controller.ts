import { Request, Response } from "express";
import { FlotaService } from "../uses-cases";
import { IFlotaRepository } from "../domain";
import { FlotaRepositoryPostgre } from "../framework/repositories/FlotaRepositoryPostgre";

export class FlotaController {
  private flotaservice: FlotaService;
  private flotaRepository: IFlotaRepository;
  constructor() {
    this.flotaRepository = new FlotaRepositoryPostgre();
    this.flotaservice = new FlotaService(this.flotaRepository);
  }
  crearFlota = async (req: Request, res: Response) => {
    res.json({ message: "Crear flota" });
  };
  obtenerFlota = (req: Request, res: Response) => {
    const flotas = this.flotaservice.getFlotas();
    res.json(flotas);
  };
  editarFlota = (req: Request, res: Response) => {
    res.json({ message: "Editar flota" });
  };
  eliminarFlota = (req: Request, res: Response) => {
    res.json({ message: "Eliminar flota" });
  };
}
