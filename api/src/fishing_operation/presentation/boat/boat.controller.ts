import { Request, Response } from "express";
import { BoatRepository } from "./../../domain/repositories/boat.repository";

export class BoatController {
  private BoatRepository = new BoatRepository();
  create = async (req: Request, res: Response) => {
    try {
      const boat = req.body;
      const newBoat = await this.BoatRepository.create(boat);
      res.status(201).json(newBoat);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const boat = req.body;
      await this.BoatRepository.update(id, boat);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.BoatRepository.delete(id);
      res.status(204).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };
  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const boat = await this.BoatRepository.findById(id);
      if (!boat) {
        res.status(404).json({ message: "Boat not found." });
        return;
      }
      res.status(200).json(boat);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const boats = await this.BoatRepository.findAll();
      res.status(200).json(boats);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: "Unexpected error." });
    }
  };
}
