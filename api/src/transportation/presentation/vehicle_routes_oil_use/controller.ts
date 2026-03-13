import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { VehicleRoutesOilUseBody } from "../transportation.schemas";

import { VehicleRoutesOilUseRepository } from "../../domain/repositories/vehicle_routes_oil_use.repository";

export class VehicleRoutesOilUseController {
  private vehicleRoutesOilUseRepository = new VehicleRoutesOilUseRepository();

  create = async (req: Request, res: Response) => {
    const { body: vehicleRoutesOilUse } = getValidated<
      Record<string, never>,
      VehicleRoutesOilUseBody
    >(req);
    const newVehicleRoutesOilUse =
      await this.vehicleRoutesOilUseRepository.create(vehicleRoutesOilUse);
    res.status(201).json(newVehicleRoutesOilUse);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: vehicleRoutesOilUse } = getValidated<
      IdParams,
      VehicleRoutesOilUseBody
    >(req);
    const { id } = params;
    await this.vehicleRoutesOilUseRepository.update(id, vehicleRoutesOilUse);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.vehicleRoutesOilUseRepository.delete(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const vehicleRoutesOilUse =
      await this.vehicleRoutesOilUseRepository.findAll();
    res.status(200).json(vehicleRoutesOilUse);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRoutesOilUse =
      await this.vehicleRoutesOilUseRepository.findById(id);
    res.status(200).json(vehicleRoutesOilUse);
    return;
  };

  getByVehicleRouteId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id: vehicleRouteId } = params;
    const vehicleRoutesOilUse =
      await this.vehicleRoutesOilUseRepository.findByVehicleRouteId(
        vehicleRouteId
      );
    res.status(200).json(vehicleRoutesOilUse);
    return;
  };
}
