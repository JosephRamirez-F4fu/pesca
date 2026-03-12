import { BoxesRepository } from "../repositories";
import { Request, Response } from "express";

export class BoxesController {
  private repository = new BoxesRepository();
  create = async (req: Request, res: Response) => {
    try {
      const boxes = req.body;
      const newBoxes = await this.repository.create(boxes);
      res.status(201).json(newBoxes);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const boxes = req.body;
      await this.repository.update(id, boxes);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.repository.delete(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const boxes = await this.repository.findAll();
      res.status(200).json(boxes);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const boxes = await this.repository.findById(id);
      res.status(200).json(boxes);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };

  getByControlPlace = async (req: Request, res: Response) => {
    try {
      const id_control_place = Number(req.params.id);
      const boxes = await this.repository.findByControlPlace(id_control_place);
      res.status(200).json(boxes);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
      return;
    }
  };
}
