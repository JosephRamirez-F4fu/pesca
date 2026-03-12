import { LoanDetailRepository } from "../../repositories/loan_detail.repository";

export class GetAllLoanDetailUseCase {
  private loanDetailRepository = new LoanDetailRepository();
  async execute() {
    const loanDetail = await this.loanDetailRepository.findAll();
    return loanDetail;
  }
}
