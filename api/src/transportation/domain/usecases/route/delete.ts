import { RouteRepository } from "../../repositories/route.repository";

export class DeleteRouteUseCase {
  private routeRepository = new RouteRepository();
  async execute(id: number): Promise<void> {
    await this.routeRepository.delete(id);
  }
}
