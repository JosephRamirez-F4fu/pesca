import { OtherCostTravelRepository } from "../../repositories/other_cost_travel.repository";

export class DeleteOtherCostTravelUseCase {
  private otherCostTravelRepository = new OtherCostTravelRepository();
  async execute(id: number) {
    return this.otherCostTravelRepository.delete(id);
  }
}
