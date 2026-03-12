import { TravelRepository } from "../../repositories/travel.repository";
import { TravelCreateDto } from "./../../dtos/travel/create.dto";

export class UpdateTravelUseCase {
  private travelRepository = new TravelRepository();
  async execute(id: number, travel: TravelCreateDto) {
    await this.travelRepository.update(id, travel);
  }
}
