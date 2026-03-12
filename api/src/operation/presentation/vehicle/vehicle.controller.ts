import { Request, Response } from "express";

import {
  CreateVehicleUseCase,
  DeleteVehicleUseCase,
  GetAllVehicleUseCase,
  GetByIdVehicleUseCase,
  UpdateVehicleUseCase,
} from "../../domain/usecases/vehicle";

export class VehicleController {
  private createVehicleUseCase = new CreateVehicleUseCase();
  private deleteVehicleUseCase = new DeleteVehicleUseCase();
  private getAllVehicleUseCase = new GetAllVehicleUseCase();
  private getByIdVehicleUseCase = new GetByIdVehicleUseCase();
  private updateVehicleUseCase = new UpdateVehicleUseCase();

  create = async (req: Request, res: Response) => {
    try {
      const vehicle = req.body;
      const newVehicle = await this.createVehicleUseCase.execute(vehicle);
      res.status(201).json(newVehicle);
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
      await this.deleteVehicleUseCase.execute(id);
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
      const vehicle = await this.getAllVehicleUseCase.execute();
      res.status(200).json(vehicle);
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
      const vehicle = await this.getByIdVehicleUseCase.execute(id);
      res.status(200).json(vehicle);
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
      const vehicle = req.body;
      await this.updateVehicleUseCase.execute(id, vehicle);
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
}
