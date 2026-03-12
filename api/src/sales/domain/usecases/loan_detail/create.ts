import { LoanDetailRepository } from "../../repositories/loan_detail.repository";
import { CreateLoanDetailDto } from "./../../dtos/loan_detail/create.dto";

export class CreateLoanDetailUseCase {
  private loanDetailRepository = new LoanDetailRepository();
  async execute(loanDetail: CreateLoanDetailDto) {
    const loanDetail_created = await this.loanDetailRepository.create(
      loanDetail
    );

    return loanDetail_created;
  }
}
