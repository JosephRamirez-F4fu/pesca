import { OtherCostChargerOperationRepository } from "../../repositories/other_cost_charger_operation.repository";
import { OtherCostChargerOperationCreateDto } from "./../../dtos/other_cost_operation/create.dto";

export class CreateOtherCostChargerOperationUseCase {
  private otherCostChargerOperationRepository =
    new OtherCostChargerOperationRepository();
  execute(data: OtherCostChargerOperationCreateDto) {
    return this.otherCostChargerOperationRepository.create(data);
  }
}
