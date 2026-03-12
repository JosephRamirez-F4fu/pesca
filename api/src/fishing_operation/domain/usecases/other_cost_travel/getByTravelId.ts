import { OtherCostTravelRepository } from "./../../repositories/other_cost_travel.repository";

export class GetOtherCostTravelByTravelIdUseCase {
  private repository = new OtherCostTravelRepository();
  async execute(id: number) {
    return this.repository.findByTravelId(id);
  }
}
