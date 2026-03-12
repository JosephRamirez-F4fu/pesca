import { LoanRepository } from "../../repositories/loan.repository";
import { CreateLoanDto } from "./../../dtos/loan/create.dto";

export class UpdateLoanUseCase {
  private loanRepository = new LoanRepository();

  async execute(id: number, loan: CreateLoanDto) {
    const loan_updated = await this.loanRepository.update(id, loan);

    return loan_updated;
  }
}
