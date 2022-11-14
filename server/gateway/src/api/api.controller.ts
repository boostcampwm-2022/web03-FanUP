import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';

@Controller('/api')
export class ApiController implements OnModuleInit, OnModuleDestroy {
  @Inject(MICRO_SERVICES.API.NAME)
  private readonly client: ClientTCP;

  onModuleInit() {}

  onModuleDestroy() {}
}
