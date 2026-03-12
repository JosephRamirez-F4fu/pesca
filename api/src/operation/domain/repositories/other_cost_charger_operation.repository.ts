import { db } from "../../../core/config/db";
import { OtherCostChargerOperation } from "../entities/other_cost_charger_operation";
import { OtherCostChargerOperationCreateDto } from "../dtos/other_cost_operation/create.dto";

export class OtherCostChargerOperationRepository {
  async create(
    data: OtherCostChargerOperationCreateDto
  ): Promise<OtherCostChargerOperation> {
    const otherCostChargerOperation_created =
      db.other_cost_charger_operation.create({
        data: {
          description: data.description,
          price: data.price,
          id_charger_operation: data.id_charger_operation,
        },
      });
    return otherCostChargerOperation_created;
  }

  async findById(id: number): Promise<OtherCostChargerOperation | null> {
    const otherCostChargerOperation =
      db.other_cost_charger_operation.findUnique({
        where: {
          id: id,
        },
      });
    return otherCostChargerOperation;
  }

  async findAll(): Promise<OtherCostChargerOperation[]> {
    const otherCostChargerOperation =
      db.other_cost_charger_operation.findMany();
    return otherCostChargerOperation;
  }

  async update(
    id: number,
    data: OtherCostChargerOperationCreateDto
  ): Promise<void> {
    await db.other_cost_charger_operation.update({
      where: {
        id: id,
      },
      data: {
        description: data.description,
        price: data.price,
        id_charger_operation: data.id_charger_operation,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.other_cost_charger_operation.delete({
      where: {
        id: id,
      },
    });
  }
}
