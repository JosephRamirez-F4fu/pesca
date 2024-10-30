import { Viaje, ViajeDTO, IViajeRepository } from "@/pesca/domain";
import { Request,Response } from "express";
import { ViajeService } from "@/pesca/uses-cases";
import { ViajeRepositoryPostgre } from "@/pesca/framework/repositories";
export class ViajeController {
  private viajeService: ViajeService;
  private viajeRepository: IViajeRepository;

  constructor() {
    this.viajeRepository = new ViajeRepositoryPostgre();
    this.viajeService = new ViajeService(this.viajeRepository);
  }

  async createViaje(req: Request, res: Response) {
  }

  async getViajes(req: Request, res: Response) {
  }

  async getViajeById(req: Request, res: Response) {
  }

  async updateViaje(req: Request, res: Response) {
  }

  async deleteViaje(req: Request, res: Response) {
  }

  async getViajesByFlotaId(req: Request, res: Response) {
  }
}
