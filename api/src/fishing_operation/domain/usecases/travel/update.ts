import { TravelRepository } from "../../repositories/travel.repository";
import { TravelUpdateDto } from "./../../dtos/travel/update.dto";

export class UpdateTravelUseCase {
  private travelRepository = new TravelRepository();
  async execute(id: number, travel: TravelUpdateDto) {
    await this.travelRepository.update(id, travel);
  }
}
