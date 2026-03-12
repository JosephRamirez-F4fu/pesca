import { db } from "../../../core/config/db";
import { ControlBoxesDto, ControlBoxesResDto } from "../dto";

export class ControlBoxesRepository {
  async create(data: ControlBoxesDto) {
    const controlBoxes = await db.control_boxes.create({
      data: {
        code: data.code,
        date_arrive: data.date_arrive,
        concluded: false,
      },
    });
    return controlBoxes;
  }

  async findAll() {
    const controlBoxes = await db.control_boxes.findMany({
      orderBy: {
        date_arrive: "desc",
      },
      include: {
        control_place: {
          include: {
            boxes: true,
          },
          where: {
            hasLiquid: true,
          },
        },
      },
    });

    return controlBoxes;
  }

  async findById(id: number) {
    const controlBoxes = await db.control_boxes.findUnique({
      where: {
        id,
      },
    });
    return controlBoxes;
  }

  async update(id: number, data: ControlBoxesResDto) {
    const controlBoxes = await db.control_boxes.update({
      where: {
        id,
      },
      data: {
        code: data.code,
        date_arrive: data.date_arrive,
        concluded: data.concluded,
      },
    });
    return controlBoxes;
  }

  async delete(id: number) {
    const controlBoxes = await db.control_boxes.delete({
      where: {
        id,
      },
    });
    return;
  }
}
