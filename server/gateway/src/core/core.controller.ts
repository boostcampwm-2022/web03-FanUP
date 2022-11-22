import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';

@Controller('core')
export class CoreController {
  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly apiClient: ClientProxy, // todo: ClientProxy, TCP 차이 알아보기
  ) {}

  @Get()
  getApiHello() {
    return this.apiClient.send({ cmd: 'getCoreHello' }, {});
  }
}
