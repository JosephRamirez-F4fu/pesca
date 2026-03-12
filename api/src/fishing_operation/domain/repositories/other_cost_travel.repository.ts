import { db } from "../../../core/config/db";

import { OtherCostTravel } from "../entities/other_cost_travel.entity";
import { OtherCostTravelCreateDto } from "../dtos/other_cost_travel/create.dto";

export class OtherCostTravelRepository {
  async create(other_cost_travel: OtherCostTravelCreateDto) {
    const other_cost_travel_created = await db.other_cost_travel.create({
      data: {
        description: other_cost_travel.description,
        price: other_cost_travel.price,
        id_travel: other_cost_travel.id_travel,
        is_added: other_cost_travel.is_added,
      },
    });
    return other_cost_travel_created;
  }

  async findById(id: number): Promise<OtherCostTravel | null> {
    const other_cost_travel = await db.other_cost_travel.findUnique({
      where: {
        id: id,
      },
    });
    return other_cost_travel;
  }

  async findAll(): Promise<OtherCostTravel[]> {
    const other_cost_travel = await db.other_cost_travel.findMany();
    return other_cost_travel;
  }

  async update(
    id: number,
    other_cost_travel: OtherCostTravelCreateDto
  ): Promise<void> {
    await db.other_cost_travel.update({
      where: {
        id: id,
      },
      data: {
        description: other_cost_travel.description,
        price: other_cost_travel.price,
        is_added: other_cost_travel.is_added,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.other_cost_travel.delete({
      where: {
        id: id,
      },
    });
  }

  async findByTravelId(id_travel: number): Promise<OtherCostTravel[]> {
    const other_cost_travel = await db.other_cost_travel.findMany({
      where: {
        id_travel: id_travel,
      },
    });
    return other_cost_travel;
  }
}
