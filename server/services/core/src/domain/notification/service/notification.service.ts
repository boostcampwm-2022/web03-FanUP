import { Injectable } from '@nestjs/common';
import {
  NotificationCreateException,
  NotificationNotFoundException,
} from '../../../common/exception';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

@Injectable()
export class NotificationService {
  create(createNotificationDto: CreateNotificationDto) {
    try {
      return 'This action adds a new notification';
    } catch (err) {
      throw new NotificationCreateException();
    }
  }

  findByUserId(userId: number) {
    try {
      return `This action returns all notification`;
    } catch (err) {
      throw new NotificationNotFoundException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
