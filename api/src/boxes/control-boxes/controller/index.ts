import { ControlBoxesRepository } from "../repositories";
import { Request, Response } from "express";

export class ControlBoxesController {
  private repository = new ControlBoxesRepository();

  create = async (req: Request, res: Response) => {
    try {
      const controlBoxes = req.body;
      const newControlBoxes = await this.repository.create(controlBoxes);
      res.status(201).json(newControlBoxes);
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
      const controlBoxes = req.body;
      await this.repository.update(id, controlBoxes);
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
      const controlBoxes = await this.repository.findAll();
      res.status(200).json(controlBoxes);
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
      const controlBoxes = await this.repository.findById(id);
      res.status(200).json(controlBoxes);
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
