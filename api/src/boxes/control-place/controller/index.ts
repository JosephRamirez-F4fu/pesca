import { Request, Response } from "express";
import { ControlPlaceRepository } from "../repositories";
export class ControlPlaceController {
  private repository = new ControlPlaceRepository();
  create = async (req: Request, res: Response) => {
    try {
      const controlPlace = await this.repository.create(req.body);
      res.status(201).json(controlPlace);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
        return;
      }
      res.status(400).send(error);
      return;
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const controlPlace = await this.repository.findAll();
      res.status(200).json(controlPlace);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const controlPlace = await this.repository.findById(
        Number(req.params.id)
      );
      if (!controlPlace) {
        res.status(404).send("Control Place not found");
        return;
      }
      res.status(200).json(controlPlace);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      await this.repository.update(Number(req.params.id), req.body);
      res.status(200).send();
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(Number(req.params.id));
      res.status(200).send();
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  };

  findControlBoxesById = async (req: Request, res: Response) => {
    try {
      const controlPlace = await this.repository.findControlBoxesById(
        Number(req.params.id)
      );
      res.status(200).json(controlPlace);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  };
}
