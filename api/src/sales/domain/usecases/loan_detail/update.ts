import { LoanDetailRepository } from "../../repositories/loan_detail.repository";
import { CreateLoanDetailDto } from "./../../dtos/loan_detail/create.dto";

export class UpdateLoanDetailUseCase {
  private loanDetailRepository = new LoanDetailRepository();
  async execute(id: number, loanDetail: CreateLoanDetailDto) {
    const loanDetail_updated = await this.loanDetailRepository.update(
      id,
      loanDetail
    );

    return loanDetail_updated;
  }
}
