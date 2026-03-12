import { Request, Response } from "express";

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
    const otherCostChargerOperation = req.body;
    const newOtherCostChargerOperation =
      await this.createOtherCostChargerOperationUseCase.execute(
        otherCostChargerOperation
      );
    res.status(201).json(newOtherCostChargerOperation);
    return;
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
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
    const id = Number(req.params.id);
    const otherCostChargerOperation =
      await this.getByIdOtherCostChargerOperationUseCase.execute(id);
    res.status(200).json(otherCostChargerOperation);
    return;
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const otherCostChargerOperation = req.body;
    await this.updateOtherCostChargerOperationUseCase.execute(
      id,
      otherCostChargerOperation
    );
    res.status(204).send();
    return;
  };
}
