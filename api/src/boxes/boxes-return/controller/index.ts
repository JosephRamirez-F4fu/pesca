import { BoxesReturnRepository } from "../repositories";
import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type {
  BoxesReturnBody,
  IdParams,
} from "../../presentation/boxes.schemas";

export class BoxesReturnController {
  private repository = new BoxesReturnRepository();

  create = async (req: Request, res: Response) => {
    const { body: boxesReturn } = getValidated<
      Record<string, never>,
      BoxesReturnBody
    >(req);
    const newBoxesReturn = await this.repository.create(boxesReturn);
    res.status(201).json(newBoxesReturn);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: boxesReturn } = getValidated<
      IdParams,
      BoxesReturnBody
    >(req);
    const { id } = params;
    await this.repository.update(id, boxesReturn);
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
    const boxesReturn = await this.repository.findAll();
    res.status(200).json(boxesReturn);
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const boxesReturn = await this.repository.findById(id);
    res.status(200).json(boxesReturn);
    return;
  };

  getByBoxes = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const boxesReturn = await this.repository.findByBoxes(id);
    res.status(200).json(boxesReturn);
    return;
  };

  getByControl = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const boxesReturn = await this.repository.findByControl(id);
    res.status(200).json(boxesReturn);
    return;
  };
}
