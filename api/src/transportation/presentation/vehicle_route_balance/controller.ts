import { Request, Response } from "express";
import { VehicleRouteBalanceRepository } from "../../domain/repositories/vehicle_route_balance.repository";

export class VehicleRouteBalanceController {
  private repository = new VehicleRouteBalanceRepository();

  create = async (req: Request, res: Response) => {
    try {
      const vehicleRouteDetail = req.body;
      const newVehicleRouteDetail = await this.repository.create(
        vehicleRouteDetail
      );
      res.status(201).json(newVehicleRouteDetail);
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
      const vehicleRouteDetail = req.body;
      await this.repository.update(id, vehicleRouteDetail);
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
      await this.repository.delete(id);
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

  getAll = async (req: Request, res: Response) => {
    try {
      const vehicleRouteDetail = await this.repository.findAll();
      res.status(200).json(vehicleRouteDetail);
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
      const vehicleRouteDetail = await this.repository.findById(id);
      res.status(200).json(vehicleRouteDetail);
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

  getByVehicleRouteId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRouteDetail = await this.repository.findByVehicleRouteId(id);
      res.status(200).json(vehicleRouteDetail);
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
