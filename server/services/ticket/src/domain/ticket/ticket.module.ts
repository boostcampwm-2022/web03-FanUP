import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from 'src/common/constants/microservices';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.CORE.NAME,
        transport: Transport.TCP,
        options: {
          host: MICRO_SERVICES.CORE.HOST,
          port: MICRO_SERVICES.CORE.PORT,
        },
      },
    ]),
  ],
  providers: [TicketService, PrismaService],
  controllers: [TicketController],
})
export class TicketModule {}
