import { Module } from '@nestjs/common';
import { NotificationService } from './service/notification.service';

@Module({
  controllers: [],
  providers: [NotificationService],
})
export class NotificationModule {}
