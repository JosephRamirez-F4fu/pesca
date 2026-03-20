import { Response, Request } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type {
  VehicleRoutesBody,
  VehicleRoutesUpdateBody,
} from "../transportation.schemas";

import {
  CreateVehicleRoutesUseCase,
  DeleteVehicleRoutesUseCase,
  FindByIdVehicleRoutesUseCase,
  GetAllVehicleRoutesUseCase,
  UpdateVehicleRoutesUseCase,
  FindByVehicleRoutesUseCase,
} from "../../domain/usecases/vehicle_routes";

export class VehicleRoutesController {
  private createVehicleRoutesUseCase = new CreateVehicleRoutesUseCase();
  private deleteVehicleRoutesUseCase = new DeleteVehicleRoutesUseCase();
  private findByIdVehicleRoutesUseCase = new FindByIdVehicleRoutesUseCase();
  private getAllVehicleRoutesUseCase = new GetAllVehicleRoutesUseCase();
  private updateVehicleRoutesUseCase = new UpdateVehicleRoutesUseCase();
  private findByVehicleRoutesUseCase = new FindByVehicleRoutesUseCase();

  create = async (req: Request, res: Response) => {
    const { body: vehicleRoutes } = getValidated<
      Record<string, never>,
      VehicleRoutesBody
    >(req);
    const newVehicleRoutes = await this.createVehicleRoutesUseCase.execute(
      vehicleRoutes
    );
    res.status(201).json(newVehicleRoutes);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: vehicleRoutes } = getValidated<
      IdParams,
      VehicleRoutesUpdateBody
    >(req);
    const { id } = params;
    await this.updateVehicleRoutesUseCase.execute(id, vehicleRoutes);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteVehicleRoutesUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRoutes = await this.findByIdVehicleRoutesUseCase.execute(id);
    res.status(200).json(vehicleRoutes);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const vehicleRoutes = await this.getAllVehicleRoutesUseCase.execute();
    res.status(200).json(vehicleRoutes);
    return;
  };

  findByVehicleRoutes = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const vehicleRoutesFound = await this.findByVehicleRoutesUseCase.execute(
      id
    );
    res.status(200).json(vehicleRoutesFound);
    return;
  };
}
