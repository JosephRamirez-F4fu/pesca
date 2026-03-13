import { OtherCostTravelRepository } from "../../repositories/other_cost_travel.repository";
import { OtherCostTravelUpdateDto } from "./../../dtos/other_cost_travel/update.dto";

export class UpdateOtherCostTravelUseCase {
  private repository = new OtherCostTravelRepository();
  async execute(id: number, otherCostTravel: OtherCostTravelUpdateDto) {
    return this.repository.update(id, otherCostTravel);
  }
}
