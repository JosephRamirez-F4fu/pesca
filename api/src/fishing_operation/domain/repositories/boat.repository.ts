import { db } from "../../../core/config/db";
import { Boat } from "./../entities/boat.entity";
import { BoatDto } from "./../dtos/boat/create.dto";

export class BoatRepository {
  async create(boat: BoatDto): Promise<Boat> {
    const boat_created = await db.boat.create({
      data: {
        name: boat.name,
      },
    });
    return boat_created;
  }

  async findById(id: number): Promise<Boat | null> {
    const boat = await db.boat.findUnique({
      where: {
        id: id,
      },
    });
    return boat;
  }

  async findAll(): Promise<Boat[]> {
    const boats = await db.boat.findMany();
    return boats;
  }

  async update(id: number, boat: BoatDto): Promise<void> {
    await db.boat.update({
      where: {
        id: id,
      },
      data: {
        name: boat.name,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.boat.delete({
      where: {
        id: id,
      },
    });
  }
}
