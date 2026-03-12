import { Request, Response } from "express";

import { VehicleRouteMoneyRepository } from "../../domain/repositories/vehicle_route_money.repository";

export class VehicleRouteMoneyController {
  private vehicleRouteMoneyRepository = new VehicleRouteMoneyRepository();

  create = async (req: Request, res: Response) => {
    try {
      const vehicleRouteMoney = req.body;
      const newVehicleRouteMoney =
        await this.vehicleRouteMoneyRepository.create(vehicleRouteMoney);
      res.status(201).json(newVehicleRouteMoney);
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
      const vehicleRouteMoney = req.body;
      await this.vehicleRouteMoneyRepository.update(id, vehicleRouteMoney);
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
      await this.vehicleRouteMoneyRepository.delete(id);
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
      const vehicleRouteMoney =
        await this.vehicleRouteMoneyRepository.findAll();
      res.status(200).json(vehicleRouteMoney);
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
      const vehicleRouteMoney = await this.vehicleRouteMoneyRepository.findById(
        id
      );
      res.status(200).json(vehicleRouteMoney);
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
      const vehicleRouteId = Number(req.params.id);
      const vehicleRouteMoney =
        await this.vehicleRouteMoneyRepository.findByVehicleRouteId(
          vehicleRouteId
        );
      res.status(200).json(vehicleRouteMoney);
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
