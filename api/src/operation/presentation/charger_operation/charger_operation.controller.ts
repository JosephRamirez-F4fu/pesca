import { Response, Request } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type {
  IdParams,
  IdTravelParams,
} from "../../../shared/presentation/schemas/common.schemas";
import type { ChargerOperationBody } from "../operation.schemas";
import {
  CreateChargerOperationUseCase,
  UpdateChargerOperationUseCase,
  DeleteChargerOperationUseCase,
  FindByChargerOperationUseCase,
  GetAllChargerOperationUseCase,
  FindByChargerOperationTravelIdUseCase,
} from "../../domain/usecases/charger_operation";

export class ChargerOperationController {
  private createChargerOperationUseCase = new CreateChargerOperationUseCase();
  private updateChargerOperationUseCase = new UpdateChargerOperationUseCase();
  private deleteChargerOperationUseCase = new DeleteChargerOperationUseCase();
  private findByChargerOperationUseCase = new FindByChargerOperationUseCase();
  private getAllChargerOperationUseCase = new GetAllChargerOperationUseCase();
  private FindByChargerOperationTravelIdUseCase =
    new FindByChargerOperationTravelIdUseCase();

  create = async (req: Request, res: Response) => {
    const { body: chargerOperation } = getValidated<
      Record<string, never>,
      ChargerOperationBody
    >(req);
    const newChargerOperation =
      await this.createChargerOperationUseCase.execute(
        chargerOperation.id_travel
      );
    res.status(201).json(newChargerOperation);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: chargerOperation } = getValidated<
      IdParams,
      ChargerOperationBody
    >(req);
    const { id } = params;
    await this.updateChargerOperationUseCase.execute(id, chargerOperation);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteChargerOperationUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const chargerOperation = await this.findByChargerOperationUseCase.execute(
      id
    );
    res.status(200).json(chargerOperation);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const chargerOperation =
      await this.getAllChargerOperationUseCase.execute();
    res.status(200).json(chargerOperation);
    return;
  };

  getChargerOperationByTravelId = async (req: Request, res: Response) => {
    const { params } = getValidated<IdTravelParams>(req);
    const { id_travel } = params;
    const chargerOperation =
      await this.FindByChargerOperationTravelIdUseCase.execute(id_travel);
    res.status(200).json(chargerOperation);
    return;
  };
}
