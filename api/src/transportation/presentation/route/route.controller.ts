import { Response, Request } from "express";

import {
  CreateRouteUseCase,
  DeleteRouteUseCase,
  FindByIdRouteUseCase,
  GetAllRouteUseCase,
  UpdateRouteUseCase,
} from "../../domain/usecases/route";

export class RouteController {
  private createRouteUseCase = new CreateRouteUseCase();
  private deleteRouteUseCase = new DeleteRouteUseCase();
  private findByIdRouteUseCase = new FindByIdRouteUseCase();
  private getAllRouteUseCase = new GetAllRouteUseCase();
  private updateRouteUseCase = new UpdateRouteUseCase();

  create = async (req: Request, res: Response) => {
    try {
      const route = req.body;
      const newRoute = await this.createRouteUseCase.execute(route);
      res.status(201).json(newRoute);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const route = req.body;
      await this.updateRouteUseCase.execute(id, route);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.deleteRouteUseCase.execute(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const route = await this.findByIdRouteUseCase.execute(id);
      res.status(200).json(route);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const route = await this.getAllRouteUseCase.execute();
      res.status(200).json(route);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log(error);
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };
}
