import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';

@Controller('/ticket')
export class TicketController {
  constructor(
    @Inject(MICRO_SERVICES.TICKET.NAME)
    private readonly ticketClient: ClientProxy,
  ) {}

  @Get()
  getApiHello() {
    return this.ticketClient.send({ cmd: 'getTicketHello' }, {});
  }
}
