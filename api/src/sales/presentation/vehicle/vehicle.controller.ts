import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type {
  SaleVehicleCreateBody,
  SaleVehicleUpdateBody,
} from "../sales.schemas";
import { SaleVehicleRepository } from "../../domain/repositories/sale-vehicle.repository";

export class SaleVehicleController {
  private repository = new SaleVehicleRepository();

  create = async (req: Request, res: Response) => {
    const { body } = getValidated<Record<string, never>, SaleVehicleCreateBody>(req);
    const vehicle = await this.repository.create(body);
    res.status(201).json(vehicle);
  };

  getAll = async (_req: Request, res: Response) => {
    const vehicles = await this.repository.findAll();
    res.status(200).json(vehicles);
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = getValidated<IdParams, SaleVehicleUpdateBody>(req);
    const vehicle = await this.repository.update(params.id, body);
    res.status(200).json(vehicle);
  };
}
