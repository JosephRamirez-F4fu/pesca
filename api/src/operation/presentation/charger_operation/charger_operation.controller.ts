import { Response, Request } from "express";
import {
  CreateChargerOperationUseCase,
  UpdateChargerOperationUseCase,
  DeleteChargerOperationUseCase,
  FindByChargerOperationUseCase,
  GetAllChargerOperationUseCase,
  FindByChargerOperationTravelIdUseCase,
} from "../../domain/usecases/charger_operation";

export class ChargerOperationController {
  private createChargerOperationUseCase = new CreateChargerOperationUseCase();
  private updateChargerOperationUseCase = new UpdateChargerOperationUseCase();
  private deleteChargerOperationUseCase = new DeleteChargerOperationUseCase();
  private findByChargerOperationUseCase = new FindByChargerOperationUseCase();
  private getAllChargerOperationUseCase = new GetAllChargerOperationUseCase();
  private FindByChargerOperationTravelIdUseCase =
    new FindByChargerOperationTravelIdUseCase();

  create = async (req: Request, res: Response) => {
    try {
      const chargerOperation = req.body;
      const newChargerOperation =
        await this.createChargerOperationUseCase.execute(
          chargerOperation.id_travel
        );
      res.status(201).json(newChargerOperation);
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
      const chargerOperation = req.body;
      await this.updateChargerOperationUseCase.execute(id, chargerOperation);
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

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.deleteChargerOperationUseCase.execute(id);
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

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const chargerOperation = await this.findByChargerOperationUseCase.execute(
        id
      );
      res.status(200).json(chargerOperation);
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
      const chargerOperation =
        await this.getAllChargerOperationUseCase.execute();
      res.status(200).json(chargerOperation);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
    }
  };

  getChargerOperationByTravelId = async (req: Request, res: Response) => {
    try {
      const id_travel = Number(req.params.id_travel);
      const chargerOperation =
        await this.FindByChargerOperationTravelIdUseCase.execute(id_travel);
      res.status(200).json(chargerOperation);
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
