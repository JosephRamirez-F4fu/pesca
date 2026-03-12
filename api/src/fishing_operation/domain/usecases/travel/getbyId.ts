import { TravelRepository } from "../../repositories/travel.repository";

export class GetByIdTravelUseCase {
  private travelRepository = new TravelRepository();
  async execute(id: number) {
    return this.travelRepository.findById(id);
  }
}
