import { PaymentRepository } from "../../repositories/payment.repository";

export class FindByPaymentUseCase {
  private paymentRepository = new PaymentRepository();

  async execute(id: number) {
    const payment = await this.paymentRepository.findById(id);

    return payment;
  }
}
