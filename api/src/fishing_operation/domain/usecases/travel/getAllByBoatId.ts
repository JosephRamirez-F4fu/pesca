import { TravelRepository } from "../../repositories/travel.repository";

export class GetAllByBoatIdTravelUseCase {
  private travelRepository = new TravelRepository();
  async execute(id: number) {
    return this.travelRepository.findAllByBoatId(id);
  }
}
