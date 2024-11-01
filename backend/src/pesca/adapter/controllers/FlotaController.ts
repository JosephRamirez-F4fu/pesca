import { Request, Response } from "express";
import { FlotaService } from "@/pesca/uses-cases";
import { AppError } from "@/shared/errors/AppError";
import { IFlotaRepository } from "@/pesca/domain";
import { FlotaRepositoryPostgre } from "@/pesca/framework/repositories/FlotaRepositoryPostgre";

export class FlotaController {
  private flotaservice: FlotaService;
  private flotaRepository: IFlotaRepository;
  constructor() {
    this.flotaRepository = new FlotaRepositoryPostgre();
    this.flotaservice = new FlotaService(this.flotaRepository);
  }

  crearFlota = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, titular,capacidad } = req.body;
      const flota = await this.flotaservice.createFlota({ nombre, titular,capacidad });
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
    let flotaId = 0;
    try {
      const { id } = req.params;
      flotaId = parseInt(id);
    } catch (error) {
      res.status(400).json({ message: "ID de flota inválido" });
    }

    try {
      const { nombre, titular,capacidad } = req.body;
      await this.flotaservice.updateFlota(flotaId, { nombre, titular, capacidad });
      res.json({ message: "Flota actualizada" });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };
  eliminarFlota = async (req: Request, res: Response) => {
    let flotaId = 0;
    try {
      const { id } = req.params;
      flotaId = parseInt(id);
    } catch (error) {
      res.status(400).json({ message: "ID de flota inválido" });
    }

    try {
      await this.flotaservice.deleteFlota(flotaId);
      res.json({ message: "Flota eliminada" });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  obtenerFlotaPorId = async (req: Request, res: Response) => {
    let flotaId = 0;
    try {
      const { id } = req.params;
      flotaId = parseInt(id);
    } catch (error) {
      res.status(400).json({ message: "ID de flota inválido" });
    }

    try {
      const flota = await this.flotaservice.getFlotaById(flotaId);
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
