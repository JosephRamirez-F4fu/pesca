import { RouteRepository } from "../../repositories/route.repository";

export class FindByIdRouteUseCase {
  private routeRepository = new RouteRepository();
  async execute(id: number) {
    const route = await this.routeRepository.findById(id);
    return route;
  }
}
