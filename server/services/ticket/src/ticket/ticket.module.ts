import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [TicketService],
  controllers: [TicketController],
  exports: [TicketService],
})
export class TicketModule {}
