import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from '../domain/notification/service/notification.service';
import { MICRO_SERVICES } from '../common/constants';
import { FanupService } from '../domain/fanup/service/fanup.service';
import { PrismaService } from '../provider/prisma/prisma.service';
import { JobService } from './job.service';
import { FanUPNotificationTask } from './task/fanup-notification.task';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: MICRO_SERVICES.TICKET.NAME,
        transport: Transport.TCP,
        options: {
          host: MICRO_SERVICES.TICKET.HOST,
          port: MICRO_SERVICES.TICKET.PORT,
        },
      },
    ]),
  ],
  providers: [
    FanUPNotificationTask,
    FanupService,
    PrismaService,
    NotificationService,
    JobService,
  ],
})
export class JobModule {}
