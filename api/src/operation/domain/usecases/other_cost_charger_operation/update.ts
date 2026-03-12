import { OtherCostChargerOperationRepository } from "../../repositories/other_cost_charger_operation.repository";
import { OtherCostChargerOperationCreateDto } from "./../../dtos/other_cost_operation/create.dto";

export class UpdateOtherCostChargerOperationUseCase {
  private otherCostChargerOperationRepository =
    new OtherCostChargerOperationRepository();
  execute(id: number, data: OtherCostChargerOperationCreateDto) {
    return this.otherCostChargerOperationRepository.update(id, data);
  }
}
