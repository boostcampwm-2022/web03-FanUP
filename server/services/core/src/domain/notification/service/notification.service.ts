import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import {
  NotificationCreateException,
  NotificationNotFoundException,
  NotificationUpdateException,
} from '../../../common/exception';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class NotificationService {
  private logger: Logger = new Logger(NotificationService.name);

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
      this.logger.log(`findByUserId: ${userId}`);
      return await this.prisma.notification.findMany({
        where: {
          user_id: userId,
          read: false,
        },
      });
    } catch (err) {
      this.logger.log(`findByUserId: ${err}`);
      throw new NotificationNotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      this.logger.log(`findOne: ${id}`);
      return await this.prisma.notification.findFirst({
        where: {
          user_id: id,
        },
      });
    } catch (err) {
      this.logger.log(`findOne: ${err}`);
      throw new NotificationNotFoundException();
    }
  }

  async updateRead(id: number) {
    try {
      this.logger.log(`updateRead: ${id}`);
      return await this.prisma.notification.updateMany({
        where: {
          user_id: id,
        },
        data: {
          read: true,
        },
      });
    } catch (err) {
      this.logger.log(`updateRead: ${err}`);
      throw new NotificationUpdateException();
    }
  }
}