import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';
import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  getApiHello() {
    return this.coreService.getApiHello();
  }
}
