import { db } from "../../../core/config/db";
import { ChargerOperation } from "../../domain/entities/charger_operation";
import { ChargerOperationCreateDto } from "../dtos/charger_opetaion/create.dto";

export class ChargerOperationRepository {
  async create(id_travel: number): Promise<ChargerOperation> {
    const chargerOperation_created = await db.charger_operation.create({
      data: {
        id_travel: id_travel,
        boxes: 0,
        charger: 0,
        footboard: 0,
        grocer: 0,
        helper: 0,
        travel_cost: 0,
        weight: 0,
        date_canceled: null,
      },
    });
    return chargerOperation_created;
  }

  async findById(id: number): Promise<ChargerOperation | null> {
    const chargerOperation = db.charger_operation.findUnique({
      where: {
        id: id,
      },
    });
    return chargerOperation;
  }

  async findAll(): Promise<ChargerOperation[]> {
    const chargerOperation = db.charger_operation.findMany();
    return chargerOperation;
  }

  async update(id: number, data: ChargerOperationCreateDto): Promise<void> {
    await db.charger_operation.update({
      where: {
        id: id,
      },
      data: {
        footboard: data.footboard,
        helper: data.helper,
        grocer: data.grocer,
        boxes: data.boxes,
        weight: data.weight,
        charger: data.charger,
        travel_cost: data.travel_cost,
        date_canceled: data.date_canceled,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.charger_operation.delete({
      where: {
        id: id,
      },
    });
  }

  async getChargerOperationByTravelId(
    id_travel: number
  ): Promise<ChargerOperation | null> {
    const chargerOperation = db.charger_operation.findFirst({
      where: {
        id_travel: id_travel,
      },
    });
    return chargerOperation;
  }
}
