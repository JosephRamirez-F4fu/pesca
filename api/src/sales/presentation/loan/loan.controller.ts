import { Response, Request } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { LoanBody } from "../sales.schemas";

import {
  CreateLoanUseCase,
  UpdateLoanUseCase,
  DeleteLoanUseCase,
  FindByLoanUseCase,
  GetAllLoanUseCase,
} from "../../domain/usecases/loan";

export class LoanController {
  private createLoanUseCase = new CreateLoanUseCase();
  private updateLoanUseCase = new UpdateLoanUseCase();
  private deleteLoanUseCase = new DeleteLoanUseCase();
  private findByLoanUseCase = new FindByLoanUseCase();
  private getAllLoanUseCase = new GetAllLoanUseCase();

  create = async (req: Request, res: Response) => {
    const { body: loan } = getValidated<Record<string, never>, LoanBody>(req);
    const newLoan = await this.createLoanUseCase.execute(loan);
    res.status(201).json(newLoan);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: loan } = getValidated<IdParams, LoanBody>(req);
    const { id } = params;
    await this.updateLoanUseCase.execute(id, loan);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteLoanUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const loan = await this.findByLoanUseCase.execute(id);
    res.status(200).json(loan);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const loan = await this.getAllLoanUseCase.execute();
    res.status(200).json(loan);
    return;
  };
}
