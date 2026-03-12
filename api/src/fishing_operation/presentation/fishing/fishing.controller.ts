import { Request, Response } from "express";
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
    try {
      const fishing = req.body;
      const newFishing = await this.createFishingUseCase.execute(fishing);
      res.status(201).json(newFishing);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.deleteFishingUseCase.execute(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const fishing = await this.getAllFishingUseCase.execute();
      res.status(200).json(fishing);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const fishing = await this.getByIdFishingUseCase.execute(id);
      res.status(200).json(fishing);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const fishing = req.body;
      await this.updateFishingUseCase.execute(id, fishing);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  getByTravelId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const fishing = await this.getByTravelIdUseCase.execute(id);
      res.status(200).json(fishing);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };
}
