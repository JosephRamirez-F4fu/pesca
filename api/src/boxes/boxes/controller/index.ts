import { BoxesRepository } from "../repositories";
import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type {
  BoxesBody,
  BoxesUpdateBody,
  IdParams,
} from "../../presentation/boxes.schemas";

export class BoxesController {
  private repository = new BoxesRepository();
  create = async (req: Request, res: Response) => {
    const { body: boxes } = getValidated<Record<string, never>, BoxesBody>(req);
    const newBoxes = await this.repository.create(boxes);
    res.status(201).json(newBoxes);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: boxes } = getValidated<IdParams, BoxesUpdateBody>(
      req
    );
    const { id } = params;
    await this.repository.update(id, boxes);
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
    const boxes = await this.repository.findAll();
    res.status(200).json(boxes);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const boxes = await this.repository.findById(id);
    res.status(200).json(boxes);
    return;
  };

  getByControlPlace = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id: id_control_place } = params;
    const boxes = await this.repository.findByControlPlace(id_control_place);
    res.status(200).json(boxes);
    return;
  };
}
