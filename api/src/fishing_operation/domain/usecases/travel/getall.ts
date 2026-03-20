import { TravelRepository } from "../../repositories/travel.repository";

export class GetAllTravelUseCase {
  private travelRepository = new TravelRepository();
  async execute() {
    return this.travelRepository.findAll();
  }
}
