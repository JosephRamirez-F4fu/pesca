import { OtherCostTravelRepository } from "../../repositories/other_cost_travel.repository";
import { OtherCostTravelCreateDto } from "./../../dtos/other_cost_travel/create.dto";

export class UpdateOtherCostTravelUseCase {
  private repository = new OtherCostTravelRepository();
  async execute(id: number, otherCostTravel: OtherCostTravelCreateDto) {
    return this.repository.update(id, otherCostTravel);
  }
}
