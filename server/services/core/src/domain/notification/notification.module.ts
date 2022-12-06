import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from '../../common/constants';
import { NotificationService } from './service/notification.service';

@Module({
  imports: [
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
  providers: [NotificationService],
})
export class NotificationModule {}
