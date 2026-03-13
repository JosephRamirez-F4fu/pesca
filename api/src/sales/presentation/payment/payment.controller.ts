import { Response, Request } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { PaymentBody } from "../sales.schemas";

import {
  CreatePaymentUseCase,
  UpdatePaymentUseCase,
  DeletePaymentUseCase,
  FindByPaymentUseCase,
  GetAllPaymentUseCase,
} from "../../domain/usecases/payment";

export class PaymentController {
  private createPaymentUseCase = new CreatePaymentUseCase();
  private updatePaymentUseCase = new UpdatePaymentUseCase();
  private deletePaymentUseCase = new DeletePaymentUseCase();
  private findByPaymentUseCase = new FindByPaymentUseCase();
  private getAllPaymentUseCase = new GetAllPaymentUseCase();

  create = async (req: Request, res: Response) => {
    const { body: payment } = getValidated<Record<string, never>, PaymentBody>(
      req
    );
    const newPayment = await this.createPaymentUseCase.execute(payment);
    res.status(201).json(newPayment);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: payment } = getValidated<IdParams, PaymentBody>(req);
    const { id } = params;
    await this.updatePaymentUseCase.execute(id, payment);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deletePaymentUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const payment = await this.findByPaymentUseCase.execute(id);
    res.status(200).json(payment);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const payment = await this.getAllPaymentUseCase.execute();
    res.status(200).json(payment);
    return;
  };
}
