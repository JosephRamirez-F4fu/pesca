import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { FishingBody } from "../fishing_operation.schemas";
import {
  CreateFishingUseCase,
  DeleteFishingUseCase,
  GetAllFishingUseCase,
  GetByIdFishingUseCase,
  UpdateFishingUseCase,
  GetFishingByTravelIdUseCase,
} from "../../domain//usecases/fishing";

export class FishingController {
  private createFishingUseCase = new CreateFishingUseCase();
  private deleteFishingUseCase = new DeleteFishingUseCase();
  private getAllFishingUseCase = new GetAllFishingUseCase();
  private getByIdFishingUseCase = new GetByIdFishingUseCase();
  private updateFishingUseCase = new UpdateFishingUseCase();
  private getByTravelIdUseCase = new GetFishingByTravelIdUseCase();

  create = async (req: Request, res: Response) => {
    const { body: fishing } = getValidated<Record<string, never>, FishingBody>(
      req
    );
    const newFishing = await this.createFishingUseCase.execute(fishing);
    res.status(201).json(newFishing);
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteFishingUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const fishing = await this.getAllFishingUseCase.execute();
    res.status(200).json(fishing);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const fishing = await this.getByIdFishingUseCase.execute(id);
    res.status(200).json(fishing);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: fishing } = getValidated<IdParams, FishingBody>(req);
    const { id } = params;
    await this.updateFishingUseCase.execute(id, fishing);
    res.status(204).send();
    return;
  };

  getByTravelId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const fishing = await this.getByTravelIdUseCase.execute(id);
    res.status(200).json(fishing);
    return;
  };
}
