import { DoneNotificationDto } from './../dtos/done-notification';
import { CreateNotificationDto } from "./../dtos/create-notification";
import { db } from "../../../core/config/db";

export class NotificationRepository {
  create = async (data: CreateNotificationDto) => {
    const notification_created = db.notification.create({
      data: {
        message: data.message,
        date: data.date,
        id_user: data.id_user,
      },
    });

    return notification_created;
  };

  getByIdPerson = async (id_user: number) => {
    const notification = db.notification.findMany({
      where: {
        id_user,
      },
    });

    return notification;
  };

  update = async (id: number, data: DoneNotificationDto) => {
    const notification_updated = db.notification.update({
      where: {
        id,
      },
      data: {
        done: data.done,
      },
    });

    return notification_updated;
  };

  delete = async (id: number) => {
    const notification_deleted = db.notification.delete({
      where: {
        id,
      },
    });

    return notification_deleted;
  };
}
