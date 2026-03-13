import { ControlBoxesRepository } from "../repositories";
import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type {
  ControlBoxesCreateBody,
  ControlBoxesBody,
  IdParams,
} from "../../presentation/boxes.schemas";

export class ControlBoxesController {
  private repository = new ControlBoxesRepository();

  create = async (req: Request, res: Response) => {
    const { body: controlBoxes } = getValidated<
      Record<string, never>,
      ControlBoxesCreateBody
    >(req);
    const newControlBoxes = await this.repository.create(controlBoxes);
    res.status(201).json(newControlBoxes);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: controlBoxes } = getValidated<
      IdParams,
      ControlBoxesBody
    >(req);
    const { id } = params;
    await this.repository.update(id, controlBoxes);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.repository.delete(id);
    res.status(204).send();
    return;
  };

  getAll = async (_req: Request, res: Response) => {
    const controlBoxes = await this.repository.findAll();
    res.status(200).json(controlBoxes);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const controlBoxes = await this.repository.findById(id);
    res.status(200).json(controlBoxes);
    return;
  };
}
