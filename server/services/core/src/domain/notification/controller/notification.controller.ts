import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../../common/constants';
import { SetResponse } from '../../../common/decorator';
import { AllRPCExceptionFilter } from '../../../common/filter';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from 'src/common/interceptor';
import { NotificationService } from '../service/notification.service';

@UseFilters(new AllRPCExceptionFilter())
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class NotificationController {
  constructor(private readonly notification: NotificationService) {}

  @SetResponse(ResMessage.UPDATE_NOTIFICATION, ResStatusCode.ACCEPTED)
  @MessagePattern('updateNotification')
  async update(data: { id: number }) {
    return await this.notification.updateRead(data.id);
  }

  @SetResponse(ResMessage.FIND_NOTIFICATION_BY_USER_ID, ResStatusCode.CREATED)
  @MessagePattern('findNotificationByUserId')
  async finByUserId(data: { userId: number }) {
    return await this.notification.findByUserId(data.userId);
  }
}
