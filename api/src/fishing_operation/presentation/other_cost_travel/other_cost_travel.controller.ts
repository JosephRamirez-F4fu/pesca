import {
  CreateOtherCostTravelUseCase,
  DeleteOtherCostTravelUseCase,
  GetAllOtherCostTravelUseCase,
  GetByIdOtherCostTravelUseCase,
  UpdateOtherCostTravelUseCase,
  GetOtherCostTravelByTravelIdUseCase,
} from "../../domain/usecases/other_cost_travel";
import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { OtherCostTravelBody } from "../fishing_operation.schemas";

export class OtherCostTravelController {
  private createOtherCostTravelUseCase = new CreateOtherCostTravelUseCase();
  private deleteOtherCostTravelUseCase = new DeleteOtherCostTravelUseCase();
  private getAllOtherCostTravelUseCase = new GetAllOtherCostTravelUseCase();
  private getByIdOtherCostTravelUseCase = new GetByIdOtherCostTravelUseCase();
  private updateOtherCostTravelUseCase = new UpdateOtherCostTravelUseCase();
  private getByTravelIdUseCase = new GetOtherCostTravelByTravelIdUseCase();

  create = async (req: Request, res: Response) => {
    const { body: otherCostTravel } = getValidated<
      Record<string, never>,
      OtherCostTravelBody
    >(req);
    const newOtherCostTravel =
      await this.createOtherCostTravelUseCase.execute(otherCostTravel);
    res.status(201).json(newOtherCostTravel);
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteOtherCostTravelUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const otherCostTravel = await this.getAllOtherCostTravelUseCase.execute();
    res.status(200).json(otherCostTravel);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const otherCostTravel = await this.getByIdOtherCostTravelUseCase.execute(
      id
    );
    res.status(200).json(otherCostTravel);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: otherCostTravel } = getValidated<
      IdParams,
      OtherCostTravelBody
    >(req);
    const { id } = params;
    await this.updateOtherCostTravelUseCase.execute(id, otherCostTravel);
    res.status(204).send();
    return;
  };

  getByTravelId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const otherCostTravel = await this.getByTravelIdUseCase.execute(id);
    res.status(200).json(otherCostTravel);
    return;
  };
}
