import { Injectable } from '@nestjs/common';
import {
  NotificationCreateException,
  NotificationNotFoundException,
} from '../../../common/exception';
import { CreateNotificationDto } from '../dto/create-notification.dto';

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
    try {
      return `This action returns a #${id} notification`;
    } catch (err) {
      throw new NotificationNotFoundException();
    }
  }

  updateRead(id: number) {
    try {
      return `해당 알림을 읽었습니다.`;
    } catch (err) {
      throw new NotificationNotFoundException();
    }
  }
}
