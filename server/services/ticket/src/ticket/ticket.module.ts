import { Module } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  providers: [TicketService, PrismaService],
  controllers: [TicketController],
})
export class TicketModule {}
