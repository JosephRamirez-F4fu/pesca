import { PaymentRepository } from "../../repositories/payment.repository";

export class DeletePaymentUseCase {
  private paymentRepository = new PaymentRepository();

  async execute(id: number) {
    await this.paymentRepository.delete(id);
  }
}
