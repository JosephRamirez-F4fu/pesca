import {
  VehicleRoute,
  VehicleRouteWithDetailAndVehicle,
} from "./../entities/vehicle_route";
import { CreateVehicleRouteDto } from "./../dtos/vehicle_route/create.dto";
import { db } from "../../../core/config/db";

export class VehicleRouteRepository {
  async create(data: CreateVehicleRouteDto): Promise<VehicleRoute> {
    const vehicleRoute = await db.vehicle_route.create({
      data: {
        id_vehicle: data.id_vehicle,
        state: data.state,
        createdAt: new Date(data.createdAt),
        is_concluded: data.is_concluded,
      },
    });
    return vehicleRoute;
  }

  async findAll(): Promise<VehicleRouteWithDetailAndVehicle[]> {
    const vehicleRoutes = await db.vehicle_route.findMany({
      include: {
        vehicle: {
          select: {
            name: true,
          },
        },
        vehicle_route_detail: true,
      },
    });
    return vehicleRoutes;
  }

  async findById(id: number): Promise<VehicleRoute | null> {
    const vehicleRoute = await db.vehicle_route.findUnique({
      where: {
        id,
      },
    });
    return vehicleRoute;
  }

  async update(id: number, data: CreateVehicleRouteDto): Promise<VehicleRoute> {
    const vehicleRoute = await db.vehicle_route.update({
      where: {
        id,
      },
      data: {
        id_vehicle: data.id_vehicle,
        state: data.state,
        createdAt: new Date(data.createdAt),
        is_concluded: data.is_concluded,
      },
    });
    return vehicleRoute;
  }

  async delete(id: number): Promise<VehicleRoute> {
    const vehicleRoute = await db.vehicle_route.delete({
      where: {
        id,
      },
    });
    return vehicleRoute;
  }
}
