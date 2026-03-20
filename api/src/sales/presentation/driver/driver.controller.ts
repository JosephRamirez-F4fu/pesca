import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type {
  SaleDriverCreateBody,
  SaleDriverUpdateBody,
} from "../sales.schemas";
import { SaleDriverRepository } from "../../domain/repositories/sale-driver.repository";

export class SaleDriverController {
  private repository = new SaleDriverRepository();

  create = async (req: Request, res: Response) => {
    const { body } = getValidated<Record<string, never>, SaleDriverCreateBody>(req);
    const driver = await this.repository.create(body);
    res.status(201).json(driver);
  };

  getAll = async (_req: Request, res: Response) => {
    const drivers = await this.repository.findAll();
    res.status(200).json(drivers);
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = getValidated<IdParams, SaleDriverUpdateBody>(req);
    const driver = await this.repository.update(params.id, body);
    res.status(200).json(driver);
  };
}
