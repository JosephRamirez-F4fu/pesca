import { NotificationRepository } from "../repositories/notificaction.repository";

export class DeleteNotificationUseCase {
  private repository = new NotificationRepository();
  async execute(id: number) {
    await this.repository.delete(id);
  }
}
