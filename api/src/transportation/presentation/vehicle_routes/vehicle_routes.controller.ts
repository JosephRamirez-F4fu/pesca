import { Response, Request } from "express";

import {
  CreateVehicleRoutesUseCase,
  DeleteVehicleRoutesUseCase,
  FindByIdVehicleRoutesUseCase,
  GetAllVehicleRoutesUseCase,
  UpdateVehicleRoutesUseCase,
  FindByVehicleRoutesUseCase,
} from "../../domain/usecases/vehicle_routes";

export class VehicleRoutesController {
  private createVehicleRoutesUseCase = new CreateVehicleRoutesUseCase();
  private deleteVehicleRoutesUseCase = new DeleteVehicleRoutesUseCase();
  private findByIdVehicleRoutesUseCase = new FindByIdVehicleRoutesUseCase();
  private getAllVehicleRoutesUseCase = new GetAllVehicleRoutesUseCase();
  private updateVehicleRoutesUseCase = new UpdateVehicleRoutesUseCase();
  private findByVehicleRoutesUseCase = new FindByVehicleRoutesUseCase();

  create = async (req: Request, res: Response) => {
    try {
      const vehicleRoutes = req.body;
      const newVehicleRoutes = await this.createVehicleRoutesUseCase.execute(
        vehicleRoutes
      );
      res.status(201).json(newVehicleRoutes);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRoutes = req.body;
      await this.updateVehicleRoutesUseCase.execute(id, vehicleRoutes);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.deleteVehicleRoutesUseCase.execute(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRoutes = await this.findByIdVehicleRoutesUseCase.execute(id);
      res.status(200).json(vehicleRoutes);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const vehicleRoutes = await this.getAllVehicleRoutesUseCase.execute();
      res.status(200).json(vehicleRoutes);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  findByVehicleRoutes = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRoutesFound = await this.findByVehicleRoutesUseCase.execute(
        id
      );
      res.status(200).json(vehicleRoutesFound);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };
}
