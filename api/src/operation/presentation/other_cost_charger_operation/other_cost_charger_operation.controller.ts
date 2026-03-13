import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { OtherCostChargerOperationBody } from "../operation.schemas";

import {
  CreateOtherCostChargerOperationUseCase,
  DeleteOtherCostChargerOperationUseCase,
  GetAllOtherCostChargerOperationUseCase,
  GetByIdOtherCostChargerOperationUseCase,
  UpdateOtherCostChargerOperationUseCase,
} from "../../domain/usecases/other_cost_charger_operation";

export class OtherCostChargerOperationController {
  private createOtherCostChargerOperationUseCase =
    new CreateOtherCostChargerOperationUseCase();

  private deleteOtherCostChargerOperationUseCase =
    new DeleteOtherCostChargerOperationUseCase();

  private getAllOtherCostChargerOperationUseCase =
    new GetAllOtherCostChargerOperationUseCase();

  private getByIdOtherCostChargerOperationUseCase =
    new GetByIdOtherCostChargerOperationUseCase();

  private updateOtherCostChargerOperationUseCase =
    new UpdateOtherCostChargerOperationUseCase();

  create = async (req: Request, res: Response) => {
    const { body: otherCostChargerOperation } = getValidated<
      Record<string, never>,
      OtherCostChargerOperationBody
    >(req);
    const newOtherCostChargerOperation =
      await this.createOtherCostChargerOperationUseCase.execute(
        otherCostChargerOperation
      );
    res.status(201).json(newOtherCostChargerOperation);
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteOtherCostChargerOperationUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const otherCostChargerOperation =
      await this.getAllOtherCostChargerOperationUseCase.execute();
    res.status(200).json(otherCostChargerOperation);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const otherCostChargerOperation =
      await this.getByIdOtherCostChargerOperationUseCase.execute(id);
    res.status(200).json(otherCostChargerOperation);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: otherCostChargerOperation } = getValidated<
      IdParams,
      OtherCostChargerOperationBody
    >(req);
    const { id } = params;
    await this.updateOtherCostChargerOperationUseCase.execute(
      id,
      otherCostChargerOperation
    );
    res.status(204).send();
    return;
  };
}
