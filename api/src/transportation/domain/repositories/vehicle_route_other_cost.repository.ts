import { db } from "../../../core/config/db";
import { VehicleRouteOtherCost } from "./../entities/vehicle_route_other_cost";
import { CreateVehicleRouteOtherCostDto } from "./../dtos/vehicle_route_other_cost/create.dto";

export class VehicleRouteOtherCostRepository {
  async create(
    data: CreateVehicleRouteOtherCostDto
  ): Promise<VehicleRouteOtherCost> {
    const vehicleRouteOtherCost = await db.vehicle_route_other_cost.create({
      data: {
        id_vehicle_route: data.id_vehicle_route,
        price: data.price,
        description: data.description,
      },
    });
    return vehicleRouteOtherCost;
  }

  async findAll(): Promise<VehicleRouteOtherCost[]> {
    const vehicleRouteOtherCosts = await db.vehicle_route_other_cost.findMany();
    return vehicleRouteOtherCosts;
  }

  async findById(id: number): Promise<VehicleRouteOtherCost | null> {
    const vehicleRouteOtherCost = await db.vehicle_route_other_cost.findUnique({
      where: {
        id,
      },
    });
    return vehicleRouteOtherCost;
  }

  async update(
    id: number,
    data: CreateVehicleRouteOtherCostDto
  ): Promise<VehicleRouteOtherCost> {
    const vehicleRouteOtherCost = await db.vehicle_route_other_cost.update({
      where: {
        id,
      },
      data: {
        id_vehicle_route: data.id_vehicle_route,
        price: data.price,
        description: data.description,
      },
    });
    return vehicleRouteOtherCost;
  }

  async delete(id: number): Promise<VehicleRouteOtherCost> {
    const vehicleRouteOtherCost = await db.vehicle_route_other_cost.delete({
      where: {
        id,
      },
    });
    return vehicleRouteOtherCost;
  }

  async findByVehicleRouteId(id: number): Promise<VehicleRouteOtherCost[]> {
    const vehicleRouteOtherCosts = await db.vehicle_route_other_cost.findMany({
      where: {
        id_vehicle_route: id,
      },
    });
    return vehicleRouteOtherCosts;
  }
}
