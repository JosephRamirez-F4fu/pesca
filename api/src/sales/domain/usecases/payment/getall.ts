import { PaymentRepository } from "../../repositories/payment.repository";

export class GetAllPaymentUseCase {
  private paymentRepository = new PaymentRepository();
  async execute() {
    const payments = await this.paymentRepository.findAll();
    return payments;
  }
}
