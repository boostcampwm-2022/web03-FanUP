import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.TICKET.NAME,
        transport: Transport.TCP,
        options: {
          port: MICRO_SERVICES.TICKET.PORT,
        },
      },
    ]),
  ],
  controllers: [TicketController],
})
export class TicketModule {}
