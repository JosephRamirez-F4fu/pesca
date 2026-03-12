import { db } from "../../../core/config/db";
import { VehicleRoutes } from "../entities/vehicle_routes";
import { CreateVehicleRoutesDto } from "../dtos/vehicle_routes/create.dto";

export class VehicleRoutesRepository {
  async create(data: CreateVehicleRoutesDto): Promise<VehicleRoutes> {
    const vehicleRoutes = await db.vehicle_routes.create({
      data: {
        id_vehicle_route: data.id_vehicle_route,
        id_route: data.id_route,
        oil_use: data.oil_use,
        createdAt: new Date(data.createdAt),
      },
    });
    return vehicleRoutes;
  }

  async findAll(): Promise<VehicleRoutes[]> {
    const vehicleRoutes = await db.vehicle_routes.findMany();
    return vehicleRoutes;
  }

  async findById(id: number): Promise<VehicleRoutes | null> {
    const vehicleRoutes = await db.vehicle_routes.findUnique({
      where: {
        id,
      },
    });
    return vehicleRoutes;
  }

  async update(
    id: number,
    data: CreateVehicleRoutesDto
  ): Promise<VehicleRoutes> {
    const vehicleRoutes = await db.vehicle_routes.update({
      where: {
        id,
      },
      data: {
        id_vehicle_route: data.id_vehicle_route,
        id_route: data.id_route,
        oil_use: data.oil_use,
        createdAt: new Date(data.createdAt),
      },
    });
    return vehicleRoutes;
  }

  async delete(id: number): Promise<VehicleRoutes> {
    const vehicleRoutes = await db.vehicle_routes.delete({
      where: {
        id,
      },
    });
    return vehicleRoutes;
  }

  async findByVehicleRouteId(id: number): Promise<VehicleRoutes[]> {
    const vehicleRoutes = await db.vehicle_routes.findMany({
      where: {
        id_vehicle_route: id,
      },
    });
    return vehicleRoutes;
  }
}
