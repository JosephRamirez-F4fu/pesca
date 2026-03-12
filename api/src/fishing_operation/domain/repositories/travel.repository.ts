import { db } from "../../../core/config/db";
import { Travel } from "../entities/travel.entity";
import { TravelCreateDto } from "../dtos/travel/create.dto";

export class TravelRepository {
  async create(travel: TravelCreateDto): Promise<Travel> {
    const travel_created = await db.travel.create({
      data: {
        oil_charge: travel.oil_charge,
        oil_charger_price: travel.oil_charger_price,
        oil_consume: travel.oil_consume,
        oil_consume_price: travel.oil_consume_price,
        provisions_cost: travel.provisions_cost,
        gas_cylinder_cost: travel.gas_cylinder_cost,
        code: travel.code,
        createdAt: travel.createdAt,
        id_boat: travel.id_boat,
      },
    });
    return travel_created;
  }
  async findById(id: number): Promise<Travel | null> {
    const travel = await db.travel.findUnique({
      where: {
        id: id,
      },
      include: {
        charger_operation: true,
        boat: true,
      },
    });
    return travel;
  }
  async findAll(): Promise<Travel[]> {
    const travel = await db.travel.findMany({
      include: {
        charger_operation: true,
      },
    });
    return travel;
  }

  async update(id: number, travel: TravelCreateDto): Promise<void> {
    await db.travel.update({
      where: {
        id: id,
      },
      data: {
        oil_charge: travel.oil_charge,
        oil_charger_price: travel.oil_charger_price,
        oil_consume: travel.oil_consume,
        oil_consume_price: travel.oil_consume_price,
        provisions_cost: travel.provisions_cost,
        gas_cylinder_cost: travel.gas_cylinder_cost,
        code: travel.code,
        createdAt: travel.createdAt,
        is_concluded: travel.is_concluded,
        oil_remaining: travel.oil_remaining,
        oil_date_canceled: travel.oil_date_canceled,
        fishing_date_canceled: travel.fishing_date_canceled,
        oil_vehicle: travel.oil_vehicle,
        oil_vehicle_price: travel.oil_vehicle_price,
        oil_vehicle_date_canceled: travel.oil_vehicle_date_canceled,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.travel.delete({
      where: {
        id: id,
      },
    });
  }

  async findAllByBoatId(boatId: number): Promise<Travel[]> {
    const travels = await db.travel.findMany({
      where: {
        id_boat: boatId,
      },
      include: {
        charger_operation: true,
      },
    });
    return travels;
  }
}
