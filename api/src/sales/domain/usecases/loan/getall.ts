import { LoanRepository } from "../../repositories/loan.repository";

export class GetAllLoanUseCase {
  private loanRepository = new LoanRepository();
  async execute() {
    const loans = await this.loanRepository.findAll();
    return loans;
  }
}
