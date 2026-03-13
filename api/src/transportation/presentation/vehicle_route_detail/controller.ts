import { VehicleRouteDetailRepository } from "../../domain/repositories/vehicle_route_detail.repository";
import { VehicleRouteRepository } from "../../domain/repositories/vehicle_route.repository";

import { Request, Response } from "express";
import {
  badRequest,
  notFound,
} from "../../../shared/domain/errors/http.error";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type {
  DestinationParams,
  IdParams,
} from "../../../shared/presentation/schemas/common.schemas";
import type { VehicleRouteDetailBody } from "../transportation.schemas";

export class VehicleRouteDetailController {
  private vehicleRouteDetailRepository = new VehicleRouteDetailRepository();
  private vehicleRoute = new VehicleRouteRepository();

  create = async (req: Request, res: Response) => {
    const { body: vehicleRouteDetail } = getValidated<
      Record<string, never>,
      VehicleRouteDetailBody
    >(req);
    const newVehicleRouteDetail =
      await this.vehicleRouteDetailRepository.create(vehicleRouteDetail);
    res.status(201).json(newVehicleRouteDetail);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: vehicleRouteDetail } = getValidated<
      IdParams,
      VehicleRouteDetailBody
    >(req);
    const { id } = params;
    await this.vehicleRouteDetailRepository.update(id, vehicleRouteDetail);

    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.vehicleRouteDetailRepository.delete(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const vehicleRouteDetails =
      await this.vehicleRouteDetailRepository.findAll();
    res.status(200).json(vehicleRouteDetails);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRouteDetail =
      await this.vehicleRouteDetailRepository.findById(id);
    res.status(200).json(vehicleRouteDetail);
    return;
  };

  getByVehicleRouteId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id: vehicleRouteId } = params;
    const vehicleRouteDetail =
      await this.vehicleRouteDetailRepository.findByVehicleRouteId(
        vehicleRouteId
      );

    const vehicleRoute = await this.vehicleRoute.findById(vehicleRouteId);
    if (!vehicleRoute) {
      throw notFound("Vehicle route not found.");
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
  };

  getVehicleUseOilByDestination = async (req: Request, res: Response) => {
    const { params } = getValidated<DestinationParams>(req);
    const { destination } = params;

    if (!destination) {
      throw badRequest("Destination is required.");
    }

    const vehicleRouteDetail =
      await this.vehicleRouteDetailRepository.findByDestiny(destination);
    res.status(200).json(vehicleRouteDetail);
    return;
  };
}
