import { db } from "../../../core/config/db";

import { BoxesDto, BoxesResDto } from "../dto";

export class BoxesRepository {
  async create(data: BoxesDto): Promise<BoxesResDto> {
    const boxes = await db.boxes.create({
      data: {
        color: data.color,
        name: data.name,
        quantity: data.quantity,
        id_control_place: data.id_control_place,
      },
    });
    return boxes;
  }

  async findAll(): Promise<BoxesResDto[]> {
    const boxes = await db.boxes.findMany();
    return boxes;
  }

  async findById(id: number): Promise<BoxesResDto | null> {
    const boxes = await db.boxes.findUnique({
      where: {
        id,
      },
    });
    return boxes;
  }

  async update(id: number, data: BoxesDto): Promise<BoxesResDto> {
    const boxes = await db.boxes.update({
      where: {
        id,
      },
      data: {
        color: data.color,
        name: data.name,
        quantity: data.quantity,
      },
    });
    return boxes;
  }

  async delete(id: number): Promise<BoxesResDto> {
    const boxes = await db.boxes.delete({
      where: {
        id,
      },
    });
    return boxes;
  }

  async findByControlPlace(id_control_place: number): Promise<BoxesResDto[]> {
    const boxes = await db.boxes.findMany({
      where: {
        id_control_place,
      },
    });
    return boxes;
  }
}
