import { LoanRepository } from "../../repositories/loan.repository";
import { CreateLoanDto } from "./../../dtos/loan/create.dto";

export class CreateLoanUseCase {
  private loanRepository = new LoanRepository();
  async execute(loan: CreateLoanDto) {
    const loan_created = await this.loanRepository.create(loan);

    return loan_created;
  }
}
