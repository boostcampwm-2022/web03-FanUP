import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { MICRO_SERVICES } from 'src/common/constants/microservices';
import { UserTicketService } from 'src/domain/user-ticket/user-ticket.service';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { JobListener } from './job.listener';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.AUTH.NAME,
        transport: Transport.TCP,
        options: {
          host: MICRO_SERVICES.AUTH.HOST,
          port: MICRO_SERVICES.AUTH.PORT,
        },
      },
      {
        name: MICRO_SERVICES.CORE.NAME,
        transport: Transport.TCP,
        options: {
          host: MICRO_SERVICES.CORE.HOST,
          port: MICRO_SERVICES.CORE.PORT,
        },
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [JobListener, UserTicketService, PrismaService],
})
export class JobModule {}
