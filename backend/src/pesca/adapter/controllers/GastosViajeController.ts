import { IGastosViajeRepository } from "@/pesca/domain";
import { GastosViajeService } from "@/pesca/uses-cases";
import {
  GastoViajeRepositoryPostgre,
  FlotaRepositoryPostgre,
  ViajeRepositoryPostgre,
} from "@/pesca/framework/repositories";
import { Request, Response } from "express";
import { AppError } from "@/shared/errors/AppError";
export class GastosViajeController {
  private gastosViajeService: GastosViajeService;
  private GastosViajeRepository: IGastosViajeRepository;
  private viajeRepository: ViajeRepositoryPostgre;
  private flotaRepository: FlotaRepositoryPostgre;
  constructor() {
    this.GastosViajeRepository = new GastoViajeRepositoryPostgre();
    this.viajeRepository = new ViajeRepositoryPostgre();
    this.flotaRepository = new FlotaRepositoryPostgre();
    this.gastosViajeService = new GastosViajeService(
      this.GastosViajeRepository,
      this.viajeRepository,
      this.flotaRepository
    );
  }
  createGastosViaje = async (req: Request, res: Response) => {
    try {
      const { id_viaje, concepto, importe } = req.body;
      const gastosViaje = await this.gastosViajeService.createGastoViaje({
        id_viaje,
        concepto,
        importe,
      });
      res.json(gastosViaje);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getGastosViaje = async (req: Request, res: Response) => {
    try {
      const gastosViaje = await this.gastosViajeService.getGastosViaje();
      res.json(gastosViaje);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getGastosViajeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const gastosViaje = await this.gastosViajeService.getGastoViajeById(
        parseInt(id)
      );
      if (!gastosViaje) {
        res.status(404).json({ message: "Gastos de viaje no encontrado" });
      } else {
        res.json(gastosViaje);
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  updateGastosViaje = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { id_viaje, concepto, importe } = req.body;
      const gastosUpdated = await this.gastosViajeService.updateGastoViaje(
        parseInt(id),
        {
          id: parseInt(id),
          id_viaje,
          concepto,
          importe,
        }
      );
      res.json(gastosUpdated);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  deleteGastosViaje = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const gastosDeleted = await this.gastosViajeService.deleteGastoViaje(
        parseInt(id)
      );
      res.json(gastosDeleted);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getGastosViajeByViajeId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const gastosViaje = await this.gastosViajeService.getGastosViajeByViajeId(
        parseInt(id)
      );
      res.json(gastosViaje);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getGastosViajeByConcepto = async (req: Request, res: Response) => {
    try {
      const { concepto } = req.params;
      const gastosViaje =
        await this.gastosViajeService.getGastosViajeByConcepto(concepto);
      res.json(gastosViaje);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getGastosViajeByFlotaId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const gastosViaje = await this.gastosViajeService.getGastosViajeByFlotaId(
        parseInt(id)
      );
      res.json(gastosViaje);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };
}
