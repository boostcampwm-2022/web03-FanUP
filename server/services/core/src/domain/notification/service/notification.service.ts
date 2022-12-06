import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import {
  NotificationCreateException,
  NotificationNotFoundException,
  NotificationUpdateException,
} from '../../../common/exception';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const { user_id, message, read } = createNotificationDto;
      return await this.prisma.notification.create({
        data: {
          user_id,
          message,
          read,
        },
      });
    } catch (err) {
      throw new NotificationCreateException();
    }
  }

  // 읽지 않은 알림 소식 가져오기
  async findByUserId(userId: number) {
    try {
      return await this.prisma.notification.findMany({
        where: {
          user_id: userId,
          read: false,
        },
      });
    } catch (err) {
      throw new NotificationNotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.notification.findFirst({
        where: {
          user_id: id,
        },
      });
    } catch (err) {
      throw new NotificationNotFoundException();
    }
  }

  async updateRead(id: number) {
    try {
      return await this.prisma.notification.updateMany({
        where: {
          user_id: id,
        },
        data: {
          read: true,
        },
      });
    } catch (err) {
      throw new NotificationUpdateException();
    }
  }
}
