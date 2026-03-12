import { db } from "../../../core/config/db";
import { Fishing } from "../entities/fishing.entity";
import { FishingCreateDto } from "../dtos/fishing/create.dto";

export class FishingRepository {
  async create(fishing: FishingCreateDto): Promise<Fishing> {
    const fishing_created = await db.fishing.create({
      data: {
        fish: fishing.fish,
        price: fishing.price,
        boxes: fishing.boxes,
        weight: fishing.weight,
        id_travel: fishing.id_travel,
      },
    });
    return fishing_created;
  }

  async findById(id: number): Promise<Fishing | null> {
    const fishing = await db.fishing.findUnique({
      where: {
        id: id,
      },
    });
    return fishing;
  }

  async findAll(): Promise<Fishing[]> {
    const fishing = await db.fishing.findMany();
    return fishing;
  }

  async update(id: number, fishing: FishingCreateDto): Promise<void> {
    await db.fishing.update({
      where: {
        id: id,
      },
      data: {
        fish: fishing.fish,
        price: fishing.price,
        boxes: fishing.boxes,
        weight: fishing.weight,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.fishing.delete({
      where: {
        id: id,
      },
    });
  }

  async findByTravelId(id_travel: number): Promise<Fishing[]> {
    const fishing = await db.fishing.findMany({
      where: {
        id_travel: id_travel,
      },
    });
    return fishing;
  }
}
