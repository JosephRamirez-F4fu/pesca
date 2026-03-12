import { db } from "./../../../core/config/db";

import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "../dtos/vehicle_route_money";

export class VehicleRouteMoneyRepository {
  async create(data: VehicleRouteMoneyDto): Promise<VehicleRouteMoneyResDto> {
    const vehicleRouteMoney = await db.vehicle_route_money.create({
      data: {
        money: data.money,
        givenby: data.givenby,
        type: data.type,
        description: data.description,
        id_vehicle_route: data.id_vehicle_route,
      },
    });
    return vehicleRouteMoney;
  }

  async findAll(): Promise<VehicleRouteMoneyResDto[]> {
    const vehicleRouteMoneys = await db.vehicle_route_money.findMany();
    return vehicleRouteMoneys;
  }

  async findById(id: number): Promise<VehicleRouteMoneyResDto | null> {
    const vehicleRouteMoney = await db.vehicle_route_money.findUnique({
      where: {
        id,
      },
    });
    return vehicleRouteMoney;
  }

  async update(
    id: number,
    data: VehicleRouteMoneyDto
  ): Promise<VehicleRouteMoneyResDto> {
    const vehicleRouteMoney = await db.vehicle_route_money.update({
      where: {
        id,
      },
      data: {
        money: data.money,
        givenby: data.givenby,
        type: data.type,
        description: data.description,
        id_vehicle_route: data.id_vehicle_route,
      },
    });
    return vehicleRouteMoney;
  }

  async delete(id: number): Promise<VehicleRouteMoneyResDto> {
    const vehicleRouteMoney = await db.vehicle_route_money.delete({
      where: {
        id,
      },
    });
    return vehicleRouteMoney;
  }

  async findByVehicleRouteId(id: number): Promise<VehicleRouteMoneyResDto[]> {
    const vehicleRouteMoneys = await db.vehicle_route_money.findMany({
      where: {
        id_vehicle_route: id,
      },
    });
    return vehicleRouteMoneys;
  }
}
