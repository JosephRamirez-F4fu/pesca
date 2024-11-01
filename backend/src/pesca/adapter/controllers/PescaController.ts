import {
  IPescaRepository,
  IFlotaRepository,
  IViajeRepository,
} from "@/pesca/domain";
import { PescaService } from "@/pesca/uses-cases";
import {
  PescaRepositoryPostgre,
  FlotaRepositoryPostgre,
  ViajeRepositoryPostgre,
} from "@/pesca/framework/repositories";
import { Request, Response } from "express";
import { AppError } from "@/shared/errors/AppError";
export class PescaControler {
  private pescaRepository: IPescaRepository;
  private flotaRepository: IFlotaRepository;
  private viajeRepository: IViajeRepository;
  private pescaService: PescaService;

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

  async createPesca(req: Request, res: Response) {
    try {
      const { id_viaje, pescado_tipo, pescado_cajas,precio } = req.body;

      const pesca = await this.pescaService.createPesca({
        id_viaje: id_viaje,
        pescado_tipo: pescado_tipo,
        pescado_cajas: pescado_cajas,
        precio:precio
      });
      res.json(pesca);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  }

  async getPesca(req: Request, res: Response) {
    const pescas = await this.pescaService.getPescas();
    res.json(pescas);
  }

  async getPescaById(req: Request, res: Response) {
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
  }

  async updatePesca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id_viaje, pescado_tipo, pescado_cajas,precio } = req.body;

      const pesca = await this.pescaService.updatePesca(parseInt(id), {
        id_viaje: id_viaje,
        pescado_tipo: pescado_tipo,
        pescado_cajas: pescado_cajas,
        precio:precio
      });
      res.json(pesca);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  }

  async deletePesca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.pescaService.deletePesca(parseInt(id));
      res.json({ message: "Pesca eliminada" });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno" });
      }
    }
  }

  async getPescaByViajeId(req: Request, res: Response) {
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
  }
}
