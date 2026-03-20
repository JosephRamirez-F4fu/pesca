import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type {
  SaleBalanceCreateBody,
  SaleBalanceDetailCreateBody,
  SaleBalanceDetailUpdateBody,
  SaleBalanceUpdateBody,
} from "../sales.schemas";
import { SaleBalanceRepository } from "../../domain/repositories/sale-balance.repository";

export class SaleBalanceController {
  private repository = new SaleBalanceRepository();

  create = async (req: Request, res: Response) => {
    const { body } = getValidated<Record<string, never>, SaleBalanceCreateBody>(req);
    const balance = await this.repository.create(body);
    res.status(201).json(balance);
  };

  getAll = async (_req: Request, res: Response) => {
    const balances = await this.repository.findAll();
    res.status(200).json(balances);
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const balance = await this.repository.findById(params.id);
    res.status(200).json(balance);
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = getValidated<IdParams, SaleBalanceUpdateBody>(req);
    const balance = await this.repository.update(params.id, body);
    res.status(200).json(balance);
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const result = await this.repository.delete(params.id);
    res.status(200).json(result);
  };

  createDetail = async (req: Request, res: Response) => {
    const { params, body } = getValidated<IdParams, SaleBalanceDetailCreateBody>(req);
    const balance = await this.repository.createDetail(params.id, body);
    res.status(201).json(balance);
  };

  updateDetail = async (req: Request, res: Response) => {
    const { body } = getValidated<Record<string, never>, SaleBalanceDetailUpdateBody>(req);
    const balanceId = Number(req.params.id);
    const detailId = Number(req.params.detailId);
    const balance = await this.repository.updateDetail(balanceId, detailId, body);
    res.status(200).json(balance);
  };

  deleteDetail = async (req: Request, res: Response) => {
    const balanceId = Number(req.params.id);
    const detailId = Number(req.params.detailId);
    const balance = await this.repository.deleteDetail(balanceId, detailId);
    res.status(200).json(balance);
  };
}
