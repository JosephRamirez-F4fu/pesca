import { Request, Response } from "express";

import { VehicleRoutesOilUseRepository } from "../../domain/repositories/vehicle_routes_oil_use.repository";

export class VehicleRoutesOilUseController {
  private vehicleRoutesOilUseRepository = new VehicleRoutesOilUseRepository();

  create = async (req: Request, res: Response) => {
    try {
      const vehicleRoutesOilUse = req.body;
      const newVehicleRoutesOilUse =
        await this.vehicleRoutesOilUseRepository.create(vehicleRoutesOilUse);
      res.status(201).json(newVehicleRoutesOilUse);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        console.log(error);
        return;
      }
      res.status(400).json({
        message: "Unexpected error.",
      });
      return;
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRoutesOilUse = req.body;
      await this.vehicleRoutesOilUseRepository.update(id, vehicleRoutesOilUse);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        console.log(error);
        return;
      }
      res.status(400).json({
        message: "Unexpected error.",
      });
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.vehicleRoutesOilUseRepository.delete(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        console.log(error);
        return;
      }
      res.status(400).json({
        message: "Unexpected error.",
      });
      return;
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const vehicleRoutesOilUse =
        await this.vehicleRoutesOilUseRepository.findAll();
      res.status(200).json(vehicleRoutesOilUse);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        console.log(error);
        return;
      }
      res.status(400).json({
        message: "Unexpected error.",
      });
      return;
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vehicleRoutesOilUse =
        await this.vehicleRoutesOilUseRepository.findById(id);
      res.status(200).json(vehicleRoutesOilUse);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        console.log(error);
        return;
      }
      res.status(400).json({
        message: "Unexpected error.",
      });
      return;
    }
  };

  getByVehicleRouteId = async (req: Request, res: Response) => {
    try {
      const vehicleRouteId = Number(req.params.id);
      const vehicleRoutesOilUse =
        await this.vehicleRoutesOilUseRepository.findByVehicleRouteId(
          vehicleRouteId
        );
      res.status(200).json(vehicleRoutesOilUse);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        console.log(error);
        return;
      }
      res.status(400).json({
        message: "Unexpected error.",
      });
      return;
    }
  };
}
