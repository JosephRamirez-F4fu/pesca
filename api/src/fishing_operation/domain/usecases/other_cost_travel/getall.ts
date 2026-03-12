import { OtherCostTravelRepository } from "../../repositories/other_cost_travel.repository";

export class GetAllOtherCostTravelUseCase {
  private otherCostTravelRepository = new OtherCostTravelRepository();
  async execute() {
    return this.otherCostTravelRepository.findAll();
  }
}
