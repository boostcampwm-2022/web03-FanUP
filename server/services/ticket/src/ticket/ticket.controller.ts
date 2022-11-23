import { Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('/get')
  read() {
    return this.ticketService.read();
  }

  @Post('/create')
  create() {
    this.ticketService.update();
  }
}
