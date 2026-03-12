import { VehicleRouteDetailRepository } from "../../domain/repositories/vehicle_route_detail.repository";
import { VehicleRouteRepository } from "../../domain/repositories/vehicle_route.repository";

import { Request, Response } from "express";

export class VehicleRouteDetailController {
  private vehicleRouteDetailRepository = new VehicleRouteDetailRepository();
  private vehicleRoute = new VehicleRouteRepository();

  create = async (req: Request, res: Response) => {
    try {
      const vehicleRouteDetail = req.body;
      const newVehicleRouteDetail =
        await this.vehicleRouteDetailRepository.create(vehicleRouteDetail);
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
      await this.vehicleRouteDetailRepository.update(id, vehicleRouteDetail);

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
      await this.vehicleRouteDetailRepository.delete(id);
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
      const vehicleRouteDetails =
        await this.vehicleRouteDetailRepository.findAll();
      res.status(200).json(vehicleRouteDetails);
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
      const vehicleRouteDetail =
        await this.vehicleRouteDetailRepository.findById(id);
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
      const vehicleRouteId = Number(req.params.id);
      const vehicleRouteDetail =
        await this.vehicleRouteDetailRepository.findByVehicleRouteId(
          vehicleRouteId
        );

      const vehicleRoute = await this.vehicleRoute.findById(vehicleRouteId);
      if (!vehicleRoute) {
        res.status(400).json({ message: "Vehicle route not found." });
        return;
      }

      if (!vehicleRouteDetail) {
        const vehicleRouteDetailCreated =
          await this.vehicleRouteDetailRepository.create({
            id_vehicle_route: vehicleRouteId,
            taxes_in: 0,
            taxes_out: 0,
            dateInit: vehicleRoute.createdAt,
            dateEnd: null,
            point_charge: null,
            who_destination: null,
            destiny: null,
            id_next_route: null,
            changeGiven: false,
          });

        res.status(200).json(vehicleRouteDetailCreated);
        return;
      }
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

  getVehicleUseOilByDestination = async (req: Request, res: Response) => {
    try {
      const destination = req.params.destination;
      const vehicleRouteDetail =
        await this.vehicleRouteDetailRepository.findByDestiny(destination);
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
