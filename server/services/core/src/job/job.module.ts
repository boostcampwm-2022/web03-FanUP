import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { MICRO_SERVICES } from '../common/constants';
import { FanupService } from '../domain/fanup/service/fanup.service';
import { PrismaService } from '../provider/prisma/prisma.service';
import { BasicTask } from './task/basic.task';

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
  providers: [BasicTask, FanupService, PrismaService],
})
export class JobModule {}
