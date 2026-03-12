import { BoxesReturnRepository } from "../repositories";
import { Request, Response } from "express";

export class BoxesReturnController {
  private repository = new BoxesReturnRepository();

  create = async (req: Request, res: Response) => {
    try {
      const boxesReturn = req.body;
      const newBoxesReturn = await this.repository.create(boxesReturn);
      res.status(201).json(newBoxesReturn);
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
      const boxesReturn = req.body;
      await this.repository.update(id, boxesReturn);
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
      const boxesReturn = await this.repository.findAll();
      res.status(200).json(boxesReturn);
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
      const boxesReturn = await this.repository.findById(id);
      res.status(200).json(boxesReturn);
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

  getByBoxes = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const boxesReturn = await this.repository.findByBoxes(id);
      res.status(200).json(boxesReturn);
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

  getByControl = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const boxesReturn = await this.repository.findByControl(id);
      res.status(200).json(boxesReturn);
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
