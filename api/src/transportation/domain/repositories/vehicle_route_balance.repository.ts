import { db } from "./../../../core/config/db";
import {
  VehicleRouteBalanceDto,
  VehicleRouteBalanceResDto,
} from "../dtos/vehicle_route_balance";
export class VehicleRouteBalanceRepository {
  async create(
    data: VehicleRouteBalanceDto
  ): Promise<VehicleRouteBalanceResDto> {
    const vehicleRouteBalance = await db.vehicle_route_balance.create({
      data: {
        balance: data.balance,
        place: data.place,
        id_vehicle_route: data.id_vehicle_route,
      },
    });
    return vehicleRouteBalance;
  }
  async findAll(): Promise<VehicleRouteBalanceResDto[]> {
    const vehicleRouteBalances = await db.vehicle_route_balance.findMany();
    return vehicleRouteBalances;
  }
  async findById(id: number): Promise<VehicleRouteBalanceResDto | null> {
    const vehicleRouteBalance = await db.vehicle_route_balance.findUnique({
      where: {
        id,
      },
    });
    return vehicleRouteBalance;
  }
  async update(
    id: number,
    data: VehicleRouteBalanceDto
  ): Promise<VehicleRouteBalanceResDto> {
    const vehicleRouteBalance = await db.vehicle_route_balance.update({
      where: {
        id,
      },
      data: {
        balance: data.balance,
        place: data.place,
      },
    });
    return vehicleRouteBalance;
  }
  async delete(id: number): Promise<VehicleRouteBalanceResDto> {
    const vehicleRouteBalance = await db.vehicle_route_balance.delete({
      where: {
        id,
      },
    });
    return vehicleRouteBalance;
  }
  async findByVehicleRouteId(id: number): Promise<VehicleRouteBalanceResDto[]> {
    const vehicleRouteBalances = await db.vehicle_route_balance.findMany({
      where: {
        id_vehicle_route: id,
      },
    });
    return vehicleRouteBalances;
  }
}
