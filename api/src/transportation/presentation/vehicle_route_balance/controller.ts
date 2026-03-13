import { Request, Response } from "express";
import { VehicleRouteBalanceRepository } from "../../domain/repositories/vehicle_route_balance.repository";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { VehicleRouteBalanceBody } from "../transportation.schemas";

export class VehicleRouteBalanceController {
  private repository = new VehicleRouteBalanceRepository();

  create = async (req: Request, res: Response) => {
    const { body: vehicleRouteDetail } = getValidated<
      Record<string, never>,
      VehicleRouteBalanceBody
    >(req);
    const newVehicleRouteDetail = await this.repository.create(
      vehicleRouteDetail
    );
    res.status(201).json(newVehicleRouteDetail);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: vehicleRouteDetail } = getValidated<
      IdParams,
      VehicleRouteBalanceBody
    >(req);
    const { id } = params;
    await this.repository.update(id, vehicleRouteDetail);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.repository.delete(id);
    res.status(204).send();
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const vehicleRouteDetail = await this.repository.findAll();
    res.status(200).json(vehicleRouteDetail);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRouteDetail = await this.repository.findById(id);
    res.status(200).json(vehicleRouteDetail);
    return;
  };

  getByVehicleRouteId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRouteDetail = await this.repository.findByVehicleRouteId(id);
    res.status(200).json(vehicleRouteDetail);
    return;
  };
}
