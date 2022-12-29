import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../../common/constants';
import { SetResponse } from '../../../common/decorator';
import { AllRPCExceptionFilter } from '../../../common/filter';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from '../../../common/interceptor';
import { NotificationService } from '../service/notification.service';
import { CreateNotification } from '../../../common/type';

@UseFilters(new AllRPCExceptionFilter())
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class NotificationController {
  constructor(private readonly notification: NotificationService) {}

  @SetResponse(ResMessage.CREATE_NOTIFICATION, ResStatusCode.CREATED)
  @MessagePattern('createNotification')
  async create(data: CreateNotification) {
    return await this.notification.create({
      ...data,
      user_id: data.userId,
    });
  }

  @SetResponse(ResMessage.UPDATE_NOTIFICATION, ResStatusCode.ACCEPTED)
  @MessagePattern('updateNotification')
  async update(data: { id: number; userId: number }) {
    return await this.notification.updateRead(data.id, data.userId);
  }

  @SetResponse(ResMessage.FIND_NOTIFICATION_BY_USER_ID, ResStatusCode.CREATED)
  @MessagePattern('findNotificationByUserId')
  async finByUserId(data: { userId }) {
    const { userId } = data;
    let id = typeof userId === 'string' ? parseInt(userId) : userId;
    return await this.notification.findByUserId(id);
  }
}
