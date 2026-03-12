import { NotificationRepository } from "../repositories/notificaction.repository";
import { CreateNotificationDto } from "./../dtos/create-notification";
export class CreateNotification {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(data: CreateNotificationDto) {
    return this.notificationRepository.create(data);
  }
}
