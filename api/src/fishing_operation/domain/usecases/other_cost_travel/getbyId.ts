import { OtherCostTravelRepository } from "../../repositories/other_cost_travel.repository";

export class GetByIdOtherCostTravelUseCase {
  private otherCostTravelRepository = new OtherCostTravelRepository();
  async execute(id: number) {
    return this.otherCostTravelRepository.findById(id);
  }
}
