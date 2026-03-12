import { Request, Response } from "express";
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
    try {
      const travel = req.body;
      const newTravel = await this.createTravelUseCase.execute(travel);
      res.status(201).json(newTravel);
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
      await this.deleteTravelUseCase.execute(id);
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
      const travel = await this.getAllTravelUseCase.execute();
      res.status(200).json(travel);
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
      const travel = await this.getByIdTravelUseCase.execute(id);
      res.status(200).json(travel);
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
      const travel = req.body;
      await this.updateTravelUseCase.execute(id, travel);
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
  resume = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const resume = await new ResumeTravelUseCase().execute(id);
      res.status(200).json(resume);
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

  getAllByBoatId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const travels = await this.getAllByBoatIdTravelUseCase.execute(id);
      res.status(200).json(travels);
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
