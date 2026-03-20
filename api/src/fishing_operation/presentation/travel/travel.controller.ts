import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type {
  TravelCreateBody,
  TravelUpdateBody,
} from "../fishing_operation.schemas";
import {
  CreateTravelUseCase,
  DeleteTravelUseCase,
  GetAllTravelUseCase,
  GetByIdTravelUseCase,
  UpdateTravelUseCase,
  ResumeTravelUseCase,
  GetAllByBoatIdTravelUseCase,
} from "../../domain/usecases/travel";

export class TravelController {
  private createTravelUseCase = new CreateTravelUseCase();
  private deleteTravelUseCase = new DeleteTravelUseCase();
  private getAllTravelUseCase = new GetAllTravelUseCase();
  private getByIdTravelUseCase = new GetByIdTravelUseCase();
  private updateTravelUseCase = new UpdateTravelUseCase();
  private getAllByBoatIdTravelUseCase = new GetAllByBoatIdTravelUseCase();

  create = async (req: Request, res: Response) => {
    const { body: travel } = getValidated<
      Record<string, never>,
      TravelCreateBody
    >(req);
    const newTravel = await this.createTravelUseCase.execute(travel);
    res.status(201).json(newTravel);
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteTravelUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const travel = await this.getAllTravelUseCase.execute();
    res.status(200).json(travel);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const travel = await this.getByIdTravelUseCase.execute(id);
    res.status(200).json(travel);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: travel } = getValidated<IdParams, TravelUpdateBody>(
      req
    );
    const { id } = params;
    await this.updateTravelUseCase.execute(id, travel);
    res.status(204).send();
    return;
  };
  resume = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const resume = await new ResumeTravelUseCase().execute(id);
    res.status(200).json(resume);
    return;
  };

  getAllByBoatId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const travels = await this.getAllByBoatIdTravelUseCase.execute(id);
    res.status(200).json(travels);
    return;
  };
}
