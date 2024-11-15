import { Request, Response } from "express";
import { FlotaService } from "@/pesca/uses-cases";
import { AppError } from "@/shared/errors/AppError";
import { IFlotaRepository } from "@/pesca/domain";
import { FlotaRepositoryPostgre } from "@/pesca/framework/repositories";

export class FlotaController {
  private flotaservice: FlotaService;
  private flotaRepository: IFlotaRepository;
  constructor() {
    this.flotaRepository = new FlotaRepositoryPostgre();
    this.flotaservice = new FlotaService(this.flotaRepository);
  }

  crearFlota = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, titular, capacidad } = req.body;
      const flota = await this.flotaservice.createFlota({
        nombre,
        titular,
        capacidad,
      });
      res.json(flota);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  obtenerFlota = async (req: Request, res: Response): Promise<void> => {
    const flotas = await this.flotaservice.getFlotas();
    res.json(flotas);
  };
  editarFlota = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nombre, titular, capacidad } = req.body;
      const floaupdated = await this.flotaservice.updateFlota(parseInt(id), {
        nombre,
        titular,
        capacidad,
      });
      res.json(floaupdated);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };
  eliminarFlota = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const flotaDeleted = await this.flotaservice.deleteFlota(parseInt(id));
      res.json(flotaDeleted);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  obtenerFlotaPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const flota = await this.flotaservice.getFlotaById(parseInt(id));
      res.json(flota);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  obtenerFlotasPorTitular = async (req: Request, res: Response) => {
    const { titular } = req.body;
    try {
      const flota = await this.flotaservice.getFlotasByTitular(titular);
      res.json(flota);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  obtenerFlotasPorNombre = async (req: Request, res: Response) => {
    const { nombre } = req.body;
    try {
      const flota = await this.flotaservice.getFlotasByNombre(nombre);
      res.json(flota);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };
}
