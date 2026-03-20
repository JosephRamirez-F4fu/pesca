import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { VehicleRouteMoneyBody } from "../transportation.schemas";

import { VehicleRouteMoneyRepository } from "../../domain/repositories/vehicle_route_money.repository";

export class VehicleRouteMoneyController {
  private vehicleRouteMoneyRepository = new VehicleRouteMoneyRepository();

  create = async (req: Request, res: Response) => {
    const { body: vehicleRouteMoney } = getValidated<
      Record<string, never>,
      VehicleRouteMoneyBody
    >(req);
    const newVehicleRouteMoney =
      await this.vehicleRouteMoneyRepository.create(vehicleRouteMoney);
    res.status(201).json(newVehicleRouteMoney);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: vehicleRouteMoney } = getValidated<
      IdParams,
      VehicleRouteMoneyBody
    >(req);
    const { id } = params;
    await this.vehicleRouteMoneyRepository.update(id, vehicleRouteMoney);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.vehicleRouteMoneyRepository.delete(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const vehicleRouteMoney =
      await this.vehicleRouteMoneyRepository.findAll();
    res.status(200).json(vehicleRouteMoney);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRouteMoney = await this.vehicleRouteMoneyRepository.findById(
      id
    );
    res.status(200).json(vehicleRouteMoney);
    return;
  };

  getByVehicleRouteId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id: vehicleRouteId } = params;
    const vehicleRouteMoney =
      await this.vehicleRouteMoneyRepository.findByVehicleRouteId(
        vehicleRouteId
      );
    res.status(200).json(vehicleRouteMoney);
    return;
  };
}
