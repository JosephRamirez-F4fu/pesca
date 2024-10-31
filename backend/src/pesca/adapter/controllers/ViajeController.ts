import { ViajeDTO, IViajeRepository, IFlotaRepository } from "@/pesca/domain";
import { Request, Response } from "express";
import { ViajeService } from "@/pesca/uses-cases";
import {
  ViajeRepositoryPostgre,
  FlotaRepositoryPostgre,
} from "@/pesca/framework/repositories";
import { AppError } from "@/shared/errors/AppError";
export class ViajeController {
  private viajeService: ViajeService;
  private viajeRepository: IViajeRepository;
  private flotaRepository: IFlotaRepository;
  constructor() {
    this.viajeRepository = new ViajeRepositoryPostgre();
    this.flotaRepository = new FlotaRepositoryPostgre();

    this.viajeService = new ViajeService(
      this.viajeRepository,
      this.flotaRepository
    );
  }
  async createViaje(req: Request, res: Response) {
    const viaje: ViajeDTO = req.body;
    try {
      const newViaje = await this.viajeService.createViaje(viaje);
      res.status(201).json(newViaje);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Internal server error" });
      }
    }
  }

  async getViajes(req: Request, res: Response) {
    try {
      const viajes = await this.viajeService.getViajes();
      res.status(200).json(viajes);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Internal server error" });
      }
    }
  }

  async getViajeById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    try {
      const viaje = await this.viajeService.getViajeById(id);
      res.status(200).json(viaje);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Internal server error" });
      }
    }
  }

  async updateViaje(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    const viaje: ViajeDTO = req.body;
    try {
      await this.viajeService.updateViaje(id, viaje);
      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Internal server error" });
      }
    }
  }

  async deleteViaje(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    try {
      await this.viajeService.deleteViaje(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Internal server error" });
      }
    }
  }

  async getViajesByFlotaId(req: Request, res: Response) {
    const flotaId = parseInt(req.params.flotaId);
    if (isNaN(flotaId)) {
      res.status(400).json({ message: "Invalid flota id" });
      return;
    }

    try {
      const viajes = await this.viajeService.getViajesByFlotaId(flotaId);
      res.status(200).json(viajes);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Internal server error" });
      }
    }
  }
}
