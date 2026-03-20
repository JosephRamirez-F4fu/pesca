import { RouteRepository } from "../../repositories/route.repository";
import { Route } from "../../entities/route";

export class GetAllRouteUseCase {
  private routeRepository = new RouteRepository();
  async execute(): Promise<Route[]> {
    const routes = await this.routeRepository.findAll();
    return routes;
  }
}
