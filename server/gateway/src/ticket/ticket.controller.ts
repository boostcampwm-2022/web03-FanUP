import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';

@Controller('/ticket')
export class TicketController implements OnModuleInit, OnModuleDestroy {
  @Inject(MICRO_SERVICES.TICKET.NAME)
  private readonly client: ClientTCP;

  onModuleInit() {}

  onModuleDestroy() {}
}
