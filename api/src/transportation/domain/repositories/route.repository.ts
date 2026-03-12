import { Route } from "./../entities/route";
import { CreateRouteDto } from "../dtos/route/create.dto";
import { db } from "./../../../core/config/db";

export class RouteRepository {
  async create(data: CreateRouteDto): Promise<Route> {
    const route = await db.route.create({
      data: {
        init: data.init,
        end: data.end,
        type: data.type,
        oil_use: data.oil_use,
      },
    });
    return route;
  }

  async findAll(): Promise<Route[]> {
    const routes = await db.route.findMany();
    return routes;
  }

  async findById(id: number): Promise<Route | null> {
    const route = await db.route.findUnique({
      where: {
        id,
      },
    });
    return route;
  }

  async update(id: number, data: CreateRouteDto): Promise<Route> {
    const route = await db.route.update({
      where: {
        id,
      },
      data: {
        init: data.init,
        end: data.end,
        type: data.type,
        oil_use: data.oil_use,
      },
    });
    return route;
  }

  async delete(id: number): Promise<Route> {
    const route = await db.route.delete({
      where: {
        id,
      },
    });
    return route;
  }
}
