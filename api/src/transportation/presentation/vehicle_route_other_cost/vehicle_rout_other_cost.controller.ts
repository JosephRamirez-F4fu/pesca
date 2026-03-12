import { Response, Request } from "express";

import {
  CreateVehicleRouteOtherCostUseCase,
  DeleteVehicleRouteOtherCostUseCase,
  FindByIdVehicleRouteOtherCostUseCase,
  GetAllVehicleRouteOtherCostUseCase,
  UpdateVehicleRouteOtherCostUseCase,
  GetByVehicleRouteUseCase,
} from "../../domain/usecases/vehicle_route_other_cost";

export class VehicleRouteOtherCostController {
  private createVehicleRouteOtherCostUseCase =
    new CreateVehicleRouteOtherCostUseCase();
  private deleteVehicleRouteOtherCostUseCase =
    new DeleteVehicleRouteOtherCostUseCase();
  private findByIdVehicleRouteOtherCostUseCase =
    new FindByIdVehicleRouteOtherCostUseCase();
  private getAllVehicleRouteOtherCostUseCase =
    new GetAllVehicleRouteOtherCostUseCase();
  private updateVehicleRouteOtherCostUseCase =
    new UpdateVehicleRouteOtherCostUseCase();

  private getByVehicleRouteUseCase = new GetByVehicleRouteUseCase();

  create = async (req: Request, res: Response) => {
    try {
      const vehicleRouteOtherCost = req.body;
      const newVehicleRouteOtherCost =
        await this.createVehicleRouteOtherCostUseCase.execute(
          vehicleRouteOtherCost
        );
      res.status(201).json(newVehicleRouteOtherCost);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRouteOtherCost = req.body;
      await this.updateVehicleRouteOtherCostUseCase.execute(
        id,
        vehicleRouteOtherCost
      );
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.deleteVehicleRouteOtherCostUseCase.execute(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRouteOtherCost =
        await this.findByIdVehicleRouteOtherCostUseCase.execute(id);
      res.status(200).json(vehicleRouteOtherCost);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const vehicleRouteOtherCost =
        await this.getAllVehicleRouteOtherCostUseCase.execute();
      res.status(200).json(vehicleRouteOtherCost);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  getByVehicleRoute = async (req: Request, res: Response) => {
    try {
      const vehicleRouteId = Number(req.params.id);
      const vehicleRouteOtherCost = await this.getByVehicleRouteUseCase.execute(
        vehicleRouteId
      );
      res.status(200).json(vehicleRouteOtherCost);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };
}
