import { OtherCostChargerOperationRepository } from "../../repositories/other_cost_charger_operation.repository";

export class GetAllOtherCostChargerOperationUseCase {
  private otherCostChargerOperationRepository =
    new OtherCostChargerOperationRepository();
  async execute() {
    return this.otherCostChargerOperationRepository.findAll();
  }
}
