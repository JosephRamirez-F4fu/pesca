import { Request, Response } from "express";
import { PescaService } from "@/pesca/uses-cases";
import {
  IPescaRepository,
  IFlotaRepository,
  IViajeRepository,
} from "@/pesca/domain";
import {
  PescaRepositoryPostgre,
  FlotaRepositoryPostgre,
  ViajeRepositoryPostgre,
} from "@/pesca/framework/repositories";
import { AppError } from "@/shared/errors/AppError";
export class PescaController {
  private pescaService: PescaService;
  private pescaRepository: IPescaRepository;
  private flotaRepository: IFlotaRepository;
  private viajeRepository: IViajeRepository;

  constructor() {
    this.pescaRepository = new PescaRepositoryPostgre();
    this.flotaRepository = new FlotaRepositoryPostgre();
    this.viajeRepository = new ViajeRepositoryPostgre();

    this.pescaService = new PescaService(
      this.pescaRepository,
      this.flotaRepository,
      this.viajeRepository
    );
  }

  createPesca = async (req: Request, res: Response) => {
    try {
      const { id_viaje, pescado_tipo, pescado_cajas, precio } = req.body;
      const pesca = await this.pescaService.createPesca({
        id_viaje: id_viaje,
        pescado_tipo: pescado_tipo,
        pescado_cajas: pescado_cajas,
        precio: precio,
      });

      res.json(pesca);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getPesca = async (req: Request, res: Response) => {
    const pescas = await this.pescaService.getPescas();
    res.json(pescas);
  };

  getPescaById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const pesca = await this.pescaService.getPescaById(parseInt(id));
      if (!pesca) {
        res.status(404).json({ message: "Pesca no encontrada" });
      } else {
        res.json(pesca);
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  updatePesca = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { id_viaje, pescado_tipo, pescado_cajas, precio } = req.body;

      const pesca = await this.pescaService.updatePesca(parseInt(id), {
        id_viaje: id_viaje,
        pescado_tipo: pescado_tipo,
        pescado_cajas: pescado_cajas,
        precio: precio,
      });
      res.json(pesca);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  deletePesca = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const pescaDeleted = await this.pescaService.deletePesca(parseInt(id));
      res.json(pescaDeleted);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getPescaByViajeId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const pesca = await this.pescaService.getPescaByViajeId(parseInt(id));
      res.json(pesca);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };

  getPescaByFlotaId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const pesca = await this.pescaService.getPescaByFlotaId(parseInt(id));
      res.json(pesca);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  };
}
