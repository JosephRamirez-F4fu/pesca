import { db } from "../../../core/config/db";
import { ControlPlaceDto, ControlPlaceResDto } from "../dto";

export class ControlPlaceRepository {
  async create(data: ControlPlaceDto): Promise<ControlPlaceResDto> {
    const controlPlace = await db.control_place.create({
      data: {
        concluded: false,
        date_arrive: data.date_arrive,
        hasLiquid: data.hasLiquid,
        id_control_boxes: data.id_control_boxes,
        name: data.name,
      },
    });
    return controlPlace;
  }

  async findAll(): Promise<ControlPlaceResDto[]> {
    const controlPlace = await db.control_place.findMany({
      orderBy: {
        date_arrive: "asc",
      },
    });
    return controlPlace;
  }

  async findById(id: number): Promise<ControlPlaceResDto | null> {
    const controlPlace = await db.control_place.findUnique({
      where: {
        id,
      },
    });
    return controlPlace;
  }

  async update(id: number, data: ControlPlaceResDto): Promise<ControlPlaceDto> {
    const controlPlace = await db.control_place.update({
      where: {
        id,
      },
      data: {
        concluded: data.concluded,
        date_arrive: data.date_arrive,
        hasLiquid: data.hasLiquid,
        name: data.name,
      },
    });
    return controlPlace;
  }

  async delete(id: number): Promise<void> {
    await db.control_place.delete({
      where: {
        id,
      },
    });

    return;
  }

  async findControlBoxesById(id: number): Promise<ControlPlaceResDto[] | null> {
    const controlPlace = await db.control_place.findMany({
      where: {
        id_control_boxes: id,
      },
      include: {
        boxes: {
          include: {
            boxes_return: true,
          },
        },
      },
    });
    return controlPlace;
  }
}
