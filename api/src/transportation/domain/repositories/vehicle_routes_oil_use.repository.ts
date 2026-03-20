import { db } from "./../../../core/config/db";

import {
  VehicleRoutesOilUseDto,
  VehicleRoutesOilUseResDto,
} from "../dtos/vehicle_routes_oil_use";

export class VehicleRoutesOilUseRepository {
  async create(
    data: VehicleRoutesOilUseDto
  ): Promise<VehicleRoutesOilUseResDto> {
    const vehicleRoutesOilUse = await db.vehicle_routes_oil_use.create({
      data: {
        id_vehicle_route: data.id_vehicle_route,
        description: data.description,
        oil_use: data.oil_use,
      },
    });
    return vehicleRoutesOilUse;
  }

  async findAll(): Promise<VehicleRoutesOilUseResDto[]> {
    const vehicleRoutesOilUse = await db.vehicle_routes_oil_use.findMany();
    return vehicleRoutesOilUse;
  }

  async findById(id: number): Promise<VehicleRoutesOilUseResDto | null> {
    const vehicleRoutesOilUse = await db.vehicle_routes_oil_use.findUnique({
      where: {
        id,
      },
    });
    return vehicleRoutesOilUse;
  }

  async update(
    id: number,
    data: VehicleRoutesOilUseDto
  ): Promise<VehicleRoutesOilUseResDto> {
    const vehicleRoutesOilUse = await db.vehicle_routes_oil_use.update({
      where: {
        id,
      },
      data: {
        id_vehicle_route: data.id_vehicle_route,
        description: data.description,
        oil_use: data.oil_use,
      },
    });
    return vehicleRoutesOilUse;
  }

  async delete(id: number): Promise<VehicleRoutesOilUseResDto> {
    const vehicleRoutesOilUse = await db.vehicle_routes_oil_use.delete({
      where: {
        id,
      },
    });
    return vehicleRoutesOilUse;
  }

  async findByVehicleRouteId(id: number): Promise<VehicleRoutesOilUseResDto[]> {
    const vehicleRoutesOilUse = await db.vehicle_routes_oil_use.findMany({
      where: {
        id_vehicle_route: id,
      },
    });
    return vehicleRoutesOilUse;
  }
}
