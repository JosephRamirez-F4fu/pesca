import { TravelRepository } from "../../repositories/travel.repository";

export class DeleteTravelUseCase {
  private travelRepository = new TravelRepository();
  async execute(id: number) {
    return this.travelRepository.delete(id);
  }
}
