import { OtherCostChargerOperationRepository } from "../../repositories/other_cost_charger_operation.repository";

export class DeleteOtherCostChargerOperationUseCase {
  private otherCostChargerOperationRepository =
    new OtherCostChargerOperationRepository();
  execute(id: number) {
    return this.otherCostChargerOperationRepository.delete(id);
  }
}
