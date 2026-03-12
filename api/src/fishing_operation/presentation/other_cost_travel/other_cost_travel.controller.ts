import {
  CreateOtherCostTravelUseCase,
  DeleteOtherCostTravelUseCase,
  GetAllOtherCostTravelUseCase,
  GetByIdOtherCostTravelUseCase,
  UpdateOtherCostTravelUseCase,
  GetOtherCostTravelByTravelIdUseCase,
} from "../../domain/usecases/other_cost_travel";
import { Request, Response } from "express";

export class OtherCostTravelController {
  private createOtherCostTravelUseCase = new CreateOtherCostTravelUseCase();
  private deleteOtherCostTravelUseCase = new DeleteOtherCostTravelUseCase();
  private getAllOtherCostTravelUseCase = new GetAllOtherCostTravelUseCase();
  private getByIdOtherCostTravelUseCase = new GetByIdOtherCostTravelUseCase();
  private updateOtherCostTravelUseCase = new UpdateOtherCostTravelUseCase();
  private getByTravelIdUseCase = new GetOtherCostTravelByTravelIdUseCase();

  create = async (req: Request, res: Response) => {
    try {
      const otherCostTravel = req.body;
      const newOtherCostTravel =
        await this.createOtherCostTravelUseCase.execute(otherCostTravel);
      res.status(201).json(newOtherCostTravel);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.deleteOtherCostTravelUseCase.execute(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const otherCostTravel = await this.getAllOtherCostTravelUseCase.execute();
      res.status(200).json(otherCostTravel);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const otherCostTravel = await this.getByIdOtherCostTravelUseCase.execute(
        id
      );
      res.status(200).json(otherCostTravel);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const otherCostTravel = req.body;
      await this.updateOtherCostTravelUseCase.execute(id, otherCostTravel);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getByTravelId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const otherCostTravel = await this.getByTravelIdUseCase.execute(id);
      res.status(200).json(otherCostTravel);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };
}
