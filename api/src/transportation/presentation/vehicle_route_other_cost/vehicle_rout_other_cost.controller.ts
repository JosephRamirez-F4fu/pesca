import { Response, Request } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { VehicleRouteOtherCostBody } from "../transportation.schemas";

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
    const { body: vehicleRouteOtherCost } = getValidated<
      Record<string, never>,
      VehicleRouteOtherCostBody
    >(req);
    const newVehicleRouteOtherCost =
      await this.createVehicleRouteOtherCostUseCase.execute(
        vehicleRouteOtherCost
      );
    res.status(201).json(newVehicleRouteOtherCost);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: vehicleRouteOtherCost } = getValidated<
      IdParams,
      VehicleRouteOtherCostBody
    >(req);
    const { id } = params;
    await this.updateVehicleRouteOtherCostUseCase.execute(
      id,
      vehicleRouteOtherCost
    );
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteVehicleRouteOtherCostUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRouteOtherCost =
      await this.findByIdVehicleRouteOtherCostUseCase.execute(id);
    res.status(200).json(vehicleRouteOtherCost);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const vehicleRouteOtherCost =
      await this.getAllVehicleRouteOtherCostUseCase.execute();
    res.status(200).json(vehicleRouteOtherCost);
    return;
  };

  getByVehicleRoute = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id: vehicleRouteId } = params;
    const vehicleRouteOtherCost = await this.getByVehicleRouteUseCase.execute(
      vehicleRouteId
    );
    res.status(200).json(vehicleRouteOtherCost);
    return;
  };
}
